import { diskStorage } from 'multer';
import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { AVATAR_DIRECTORY, AVATAR_DOWNLOAD_DIRECTORY, SUPORT_FILE_FORMAT_LIST } from 'src/shared/utils/const';
import { Client } from '../../models/client.model';
import { Pet } from '../../models/pet.model';

@Injectable()
export class PetService {

    constructor(@InjectModel('Client') private readonly model:Model<Client>){

    }

    public async create(cpf:string,data:Pet[]):Promise<Client>{
        const options = {upsert:true, new:true};
        return await this.model.findOneAndUpdate({cpf:cpf},{
            $push:{
                pets:data,
            }
        },options);
    }

    public async update(cpf:string,id:string,data:Pet):Promise<Client>{
        return await this.model.findOneAndUpdate({cpf,'pets._id':id},{
            $set:{
                'pets.$.name':data.name,
                'pets.$.gender':data.gender,
                'pets.$.kind':data.kind,
                'pets.$.age':data.age,
                'pets.$.weight':data.weight,
            }
        });
    }

    public async updateAvatar(cpf:string,id:string,urlAvatar:string):Promise<Client>{
        return await this.model.findOneAndUpdate({cpf, 'pets._id':id}, {
                $set:{
                    'pets.$.urlAvatar' : urlAvatar
                }
            });
    }

    public async get(cpf:string, id: string):Promise<Pet>{
        const {pets} = await this.model.findOne({cpf},'pets').exec();
        return pets.find(p=> p._id == id);
    }

    public async download(cpf:string,id:string):Promise<StreamableFile>{
        const pet = await this.get(cpf,id);
        const fileName = join(process.cwd(),AVATAR_DOWNLOAD_DIRECTORY,pet.urlAvatar);
        const file = createReadStream(fileName);
        return new StreamableFile(file);
    }

    public static  fileInterceptorFilterExtensionsFile = (req,file,cb) =>{
        const extension = file.mimetype;
        if(!SUPORT_FILE_FORMAT_LIST.includes(extension)){
            return cb(null, false);
        }
        return cb(null, true);
    }

    public static fileInterceptorFilterStorage = ()=>{
        return diskStorage({
            destination: AVATAR_DIRECTORY,
            filename:(req,file,cb) =>{
                const fileName = `${req.params["id"]}-${file.originalname}`;
                return cb(null,fileName);
            }
        })
    }
}
