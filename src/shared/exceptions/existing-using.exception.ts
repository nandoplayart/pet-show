import { HttpException, HttpStatus } from "@nestjs/common";

export class ExistingUserException extends HttpException{
    constructor(response: string | Record<string, any>){
        super(response,HttpStatus.BAD_REQUEST);
    }
}