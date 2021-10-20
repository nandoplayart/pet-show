import { ApiProperty } from "@nestjs/swagger"

export class UserCreateDto{
    constructor(
         username:string,
         email:string,
         password:string,
    ){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    @ApiProperty()
    username:string

    @ApiProperty()
    email:string

    @ApiProperty()
    password:string
}