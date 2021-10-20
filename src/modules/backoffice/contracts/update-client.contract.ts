import { Contract } from "src/shared/interceptors/contract";
import { Flunt } from "src/shared/utils/flunt";
import { ClientUpdateDto } from "../dtos/client.update.dto";


export class UpdateClientContract implements Contract{
    erros: any[];
    validate(model: ClientUpdateDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name,5,'Informe o nome');
        flunt.isFixedLen(model.cpf,11,'CPF inválido');
        flunt.isFixedLen(model.rg,9,'RG inválido');
        flunt.isRequired(model.address.zipCode,'Informe o CEP');
        flunt.isRequired(model.address.street, 'Informe a Rua');
        flunt.isRequired(model.address.number, 'Informe o número');
        flunt.isRequired(model.address.neighborhood, 'Informe o Bairro');
        flunt.isRequired(model.address.city, 'Informe a cidade');
        flunt.isRequired(model.address.country, 'Informe o País');
        this.erros = flunt.errors;
        return flunt.isValid();

    }

}