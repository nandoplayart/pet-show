import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../models/client.model';

@Injectable()
export class ClientService {

    constructor(@InjectModel('Client') private readonly model:Model<Client>){

    }

    async create(data:Client):Promise<Client>{
        const client = new this.model(data);
        return await client.save();
    }

    async update(email:string,data: Client):Promise<Client>{
        return await this.model.findOneAndUpdate({email},data);
    }

    async findByEmail(email:string):Promise<Client>{
        return this.model.findOne({email:email}).exec();
    }

    async find(cpf):Promise<Client>{
        return await this.model.findOne({cpf}).exec();
    }
    async findAll():Promise<Client[]>{
        return this.model.aggregate([
            {"$project":{
                    _id: 0,
                    id: "$_id",
                    email:"$email",
                    name:"$name",
                    birthDate: "$birthDate",
                    cpf:"$cpf",
                    rg: "$rg",
                    adress:"$adress"
                }
            }
        ]);
    }
}
