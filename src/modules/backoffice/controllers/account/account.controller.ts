import { Body, Controller, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { ExistingUserException } from 'src/shared/exceptions/existing-using.exception';
import { AuthenticateUserContract } from '../../contracts/authenticate-user.contract';
import { ValidateUserContract } from '../../contracts/validate-user.contract';
import { AuthenticateDto } from '../../dtos/authenticate.dto';
import { ResultDto } from '../../dtos/result.dto';
import { UserCreateDto } from '../../dtos/user.dto';
import { AccountFacade } from '../../facades/account.facade';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('v1/accounts')
@ApiBearerAuth()
export class AccountController {

    constructor(
        private readonly accountFacade: AccountFacade
    ){}

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new ValidateUserContract()))
    async post(@Body() model:UserCreateDto): Promise<ResultDto> {
        try{
            return await this.accountFacade.createUser(model);
        }
        catch(ex){
            if(ex instanceof ExistingUserException){
                throw ex;
            }
            throw new HttpException(new ResultDto('Não foi possível realizar o cadastro',false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }

    @Post('authenticate')
    @UseInterceptors(new ValidatorInterceptor(new AuthenticateUserContract()))
    async authenticate(@Body() model: AuthenticateDto ):Promise<any>{
        try{
            return await this.accountFacade.authenticate(model);
        }
        catch(ex){
        throw new HttpException(new ResultDto('Não foi possível realizar o cadastro',false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }
}
