import { ApiProperty } from "@nestjs/swagger";
import { AddressDto } from "./address.dto";


export class ClientCreateDto{
    constructor(
         email:string,
         name:string,
         birthDate:string,
         cpf:string,
         rg:string,
         address:AddressDto,
        ){
            this.email = email;
            this.name = name;
            this.birthDate = birthDate;
            this.cpf = cpf;
            this.rg = rg;
            this.address = address;
            
    }

    @ApiProperty()
    email:string
    
    @ApiProperty()
    name:string
    
    @ApiProperty()
    birthDate:string
    
    @ApiProperty()
    cpf:string
    
    @ApiProperty()
    rg:string

    @ApiProperty()
    address:AddressDto
}