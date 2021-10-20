import { AddressDto } from './address.dto';
import { ApiProperty } from "@nestjs/swagger";



export class ClientUpdateDto{
    constructor(
        name:string,
        birthDate:string,
        cpf:string,
        rg:string,
        address:AddressDto,
       ){
           this.name = name;
           this.birthDate = birthDate;
           this.cpf = cpf;
           this.rg = rg;
           this.address = address;
           
   }

   
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