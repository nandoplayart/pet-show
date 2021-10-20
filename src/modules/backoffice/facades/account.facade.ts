import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExistingUserException } from "src/shared/exceptions/existing-using.exception";
import { AuthenticateDto } from "../dtos/authenticate.dto";
import { ResultDto } from "../dtos/result.dto";
import { UserCreateDto } from "../dtos/user.dto";
import { Client, ClientFactory } from "../models/client.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account/account.service";
import { AuthService } from "../services/auth/auth.service";
import { ClientService } from "../services/client/client.service";

@Injectable()
export class AccountFacade{
    constructor(
        private readonly accountService:AccountService,
        private readonly authService:AuthService,
        private readonly clientService:ClientService
    ){}

    public async createUser(model:UserCreateDto): Promise<ResultDto> {
        const existsUser = await this.accountService.findByEmail(model.email);
        if(existsUser){
            throw new ExistingUserException(new ResultDto('Usuário já existe.',false,null,null));
        }
        
        const user = await this.accountService.create( new User(model.email,model.username,model.password,['user'],true));
        const existsClient = await this.clientService.findByEmail(model.email);
        if(!existsClient){
            await this.clientService.create(ClientFactory.createMinimalClient(model.email,user));
        }else{
            existsClient.user = user;
            await this.clientService.update(model.email,existsClient);
        }
        return new ResultDto(null,true,model,null);
    }

    public async authenticate(model: AuthenticateDto ):Promise<any>{
        
        const client = await this.accountService.authenticate(model);
        if(this.validateIfExistsUser(client)){
            const token = await this.authService.createToken(client.cpf?client.cpf: '', client.user.email, '', client.user.roles);
            return new ResultDto(null, true, token, null);
        }
    }

    private  validateIfExistsUser(client: Client): boolean{
        if (!client)
            throw new HttpException(new ResultDto('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        if (!client.user.active)
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);
 
        return true;    
    }
}