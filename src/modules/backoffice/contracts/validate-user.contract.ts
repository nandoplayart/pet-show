import { UserCreateDto } from '../dtos/user.dto';
import { Contract } from "src/shared/interceptors/contract";
import { Flunt } from "src/shared/utils/flunt";

export class ValidateUserContract implements Contract{
    erros: any[];
    validate(model: UserCreateDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.username,5,'Usuário inválido');
        flunt.isEmail(model.email,'E-mail inválido');
        flunt.hasMinLen(model.password,10,'Senha deve conter no mínimo 10 caracteres.');
        this.erros = flunt.errors;
        return flunt.isValid();

    }

}