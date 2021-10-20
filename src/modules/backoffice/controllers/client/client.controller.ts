import { AccountService } from './../../services/account/account.service';
import { JwtAuthGuard } from './../../../../shared/strategies/jwt-auth.guard';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateClientContract } from '../../contracts/create-client.contract';
import { ClientCreateDto } from '../../dtos/client.create.dto';
import { ResultDto } from '../../dtos/result.dto';
import { Address } from '../../models/address.model';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client/client.service';
import { ClientUpdateDto } from '../../dtos/client.update.dto';
import { UpdateClientContract } from '../../contracts/update-client.contract';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('v1/clients')
@ApiBearerAuth()
export class ClientController {
    constructor(
        private readonly clientService:ClientService,
        private readonly accountService:AccountService
    ){

    }
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateClientContract()))
    async post(@Body() model:ClientCreateDto){
        try{
            const {address} = model;
            const addressModel = new Address(address.zipCode,address.street,address.number,address.complement,address.neighborhood,address.state,address.city,address.country);
            await this.clientService.create(new Client(model.email,model.name,model.birthDate,model.cpf,model.rg,addressModel,[],null));
            return new ResultDto(null,true,model,null);

        }catch(ex){
            throw new HttpException(new ResultDto('Não foi possível realizar o cadastro',false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':email')
    @UseInterceptors(new ValidatorInterceptor(new UpdateClientContract()))
    async put(@Param('email') email:string,@Body() model:ClientUpdateDto){
        try{
            const {address} = model;
            const user = await this.accountService.findByEmail(email);
            const addressModel = new Address(address.zipCode,address.street,address.number,address.complement,address.neighborhood,address.state,address.city,address.country);
            await this.clientService.update(email,new Client(email,model.name,model.birthDate,model.cpf,model.rg,addressModel,[],user));
            return new ResultDto(null,true,model,null);

        }catch(ex){
            throw new HttpException(new ResultDto('Não foi possível realizar o cadastro',false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getAll(): Promise<ResultDto>{
        const clients = await this.clientService.findAll();
        return new ResultDto(null, true, clients, null);
    }
    @Get(':cpf')
    async get(@Param('cpf') cpf) : Promise<ResultDto>{
        const client = await this.clientService.find(cpf);
        return new ResultDto(null, true, client, null);
    }

    @Get(':email')
    async findByEmail(@Param('email') email) : Promise<ResultDto> {
        const client = await this.clientService.findByEmail(email);
        return new ResultDto(null, true, client, null);
    }
}
