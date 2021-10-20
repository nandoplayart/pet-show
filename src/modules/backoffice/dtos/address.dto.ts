import { ApiProperty } from "@nestjs/swagger"

export class AddressDto{
    constructor(
         zipCode: string,
         street: string,
         number: string,
         complement: string,
         neighborhood: string,
         city: string,
         state: string,
         country: string,
        ){
            this.zipCode = zipCode;
            
            this.street= street,
            this.number= number,
            this.complement= complement,
            this.neighborhood= neighborhood,
            this.city= city,
            this.state= state,
            this.country= country
        }

        @ApiProperty()
         zipCode: string

         @ApiProperty()
         street: string

         @ApiProperty()
         number: string

         @ApiProperty()
         complement: string

         @ApiProperty()
         neighborhood: string

         @ApiProperty()
         city: string

         @ApiProperty()
         state: string

         @ApiProperty()
         country: string
}