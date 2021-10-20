import { ApiProperty } from "@nestjs/swagger"


export class PetCreateDto{
    constructor(
         name: string,
         gender: string,
         kind:string,
         breed:string,
         age:string,
         weight: string){
             this.name = name;
             this.gender = gender;
             this.kind = kind;
             this.breed = breed;
             this.age = age;
             this.weight = weight;
    }
    @ApiProperty()
    name: string

    @ApiProperty()
    gender: string

    @ApiProperty()
    kind:string

    @ApiProperty()
    breed:string

    @ApiProperty()
    age:string

    @ApiProperty()
    weight: string
}