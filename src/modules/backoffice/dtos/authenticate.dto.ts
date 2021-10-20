import { ApiProperty } from "@nestjs/swagger";

export class AuthenticateDto {
    constructor(
         email:string,
         password: string,
    ) {
       
        this.password = password;
        this.email = email;
    }

    @ApiProperty()
    email:string

    @ApiProperty()
    password:string

}
