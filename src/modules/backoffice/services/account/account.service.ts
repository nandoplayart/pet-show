import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cryptography } from 'src/shared/cryptography/cryptography';
import { AuthenticateDto } from '../../dtos/authenticate.dto';
import { Client } from '../../models/client.model';
import { User } from '../../models/user.model';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('Client') private readonly clientModel:Model<Client>,
        @InjectModel('User') private readonly userModel:Model<User>
    ){

    }

    async create(data:User):Promise<User>{

        const exists = await this.userModel.findOne({email:data.email}).exec();

        const pass = new Cryptography().Generate(data.password);
        data.password = pass;
        const user = new this.userModel(data);
        return user.save();
    }

    async findByUserName(username:string):Promise<User>{
        return this.userModel.findOne({username:username}).exec();
    }
    async findByEmail(email:string):Promise<User>{
        return this.userModel.findOne({email:email}).exec();
    }

    async update(username:string,data:any):Promise<User>{
        return await this.userModel.findOneAndUpdate({username},data);
    }

    async authenticate(model:AuthenticateDto):Promise<Client>{
        const client = await this.clientModel.findOne({email:model.email}).populate('user').exec();
        if(!client) return null;
        if(!client.user) return null;
        const pass = new Cryptography().Generate(model.password);
        if(pass === client.user.password){
            return client;
        }else{
            return null;
        }

    }

}
