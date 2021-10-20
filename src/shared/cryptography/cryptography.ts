import { Md5 } from "md5-typescript";

export class Cryptography{

    constructor(){
        
    }
public Generate(value:string):string{
    const crypto = Md5.init(`${value}${process.env.SALT_KEY}`);
    return crypto;
}

}