
import { Address } from "./address.model";
import { Pet } from "./pet.model";
import { User } from "./user.model";


export class Client{
    constructor(
        public email: string,
        public name:string,
        public birthDate:string,
        public cpf:string,
        public rg:string,
        public adress:Address,
        public pets:Pet[],
        public user:User
        ){

    }

}

export class ClientFactory{
    public static createMinimalClient(email:string, user:User){
        return new Client(email,null,null,null,null,null,[],user);
    }
}