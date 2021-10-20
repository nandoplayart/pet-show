import * as mongoose from "mongoose";

export const ClientSchema = new mongoose.Schema({

     email:{
         type: String,
         required: true,
         index:{
            unique: true
        }
     },
     name:{
         type: String,
         required: false
     },
     birthDate:{
         type: String,
         required: false,

     },
     cpf:{
        type: String,
        required: false,
        trim: true,
     },
     rg:{
        type: String,
        required: false,
        trim: true,
     },
     pets:[
         {
             id: {
                 type: String,
             },
             name: {
                type: String,
            },
            gender: {
                type: String,
                enum: ['male', 'female', 'none'],
            },
            kind: {
                type: String
                
            },
            breed: {
                type: String,
            },
            urlAvatar:{
                type: String,
            }
         }
     ],
     address:{
        zipcode: {
            type: String,
        },
        street: {
            type: String,
        },
        number: {
            type: String,
        },
        complement: {
            type: String,
        },
        neighborhood: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
     },
     user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: false
     }
});