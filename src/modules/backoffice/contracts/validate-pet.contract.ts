import { Contract } from "src/shared/interceptors/contract";
import { Flunt } from "src/shared/utils/flunt";
import { PetCreateDto } from "../dtos/pet.create.dto";


export class ValidatePetContract implements Contract{
    erros: any[];
    validate(model: PetCreateDto): boolean {
        const flunt = new Flunt();
        flunt.isRequired(model.name,'Favor informar o nome do pet.');
        flunt.isRequired(model.age,'Favor informar o idade do pet.');
        flunt.isRequired(model.breed,'Favor informar o raça do pet.');
        flunt.isRequired(model.gender,'Favor informar o sexo do pet.');
        flunt.isRequired(model.weight,'Favor informar o peso do pet.');
        flunt.isRequired(model.kind,'Favor informar a espécie do pet.');
        this.erros = flunt.errors;
        return flunt.isValid();
    }
    
}