import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { JwtAuthGuard } from 'src/shared/strategies/jwt-auth.guard';
import { SUPORT_FILE_FORMAT_LIST } from 'src/shared/utils/const';
import { ValidatePetContract } from '../../contracts/validate-pet.contract';
import { PetCreateDto } from '../../dtos/pet.create.dto';
import { ResultDto } from '../../dtos/result.dto';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet/pet.service';

@Controller('v1/')
@ApiTags('Pet')
@ApiBearerAuth()
export class PetController {
    constructor(
        private readonly petService:PetService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get(':cpf/pets/:id/avatar')
    async download(@Param('cpf') cpf:string,@Param('id') id:string): Promise<StreamableFile>  {
        return  await this.petService.download(cpf,id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':cpf/pets/:id/avatar')
    @UseInterceptors(FileInterceptor('file',{
        fileFilter: PetService.fileInterceptorFilterExtensionsFile, 
        storage: PetService.fileInterceptorFilterStorage()
    }))
    async upload(@Param('cpf') cpf:string,@Param('id') id:string,@UploadedFile() file:Express.Multer.File ){
        try{
            await this.petService.updateAvatar(cpf,id,file.filename);
            return new ResultDto("Upload realizado com sucesso",true,null,null);

        }catch(ex){
            const message = `Não foi possível atualizar o cadastro. Verifique se o arquivo esta no formato aceitavél. Formatos aceitos: ${ SUPORT_FILE_FORMAT_LIST.join(',')}`
            throw new HttpException(new ResultDto(message,false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post(':cpf/pets')
    @UseInterceptors(new ValidatorInterceptor(new ValidatePetContract()))
    async post(@Param('cpf') cpf:string,@Body() model:PetCreateDto ){
        try{
            const pets = [new Pet(model.name,model.gender,model.kind,model.breed,model.age,model.weight,'')];
            await this.petService.create(cpf,pets);
            return new ResultDto(null,true,model,null);
        }catch(ex){
            throw new HttpException(new ResultDto('Não foi possível realizar o cadastro',false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':cpf/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new ValidatePetContract()))
    async put(@Param('cpf') cpf:string,@Param('id') id:string ,@Body() model:PetCreateDto ){
        try{
            const pet = new Pet(model.name,model.gender,model.kind,model.breed,model.age,model.weight,'');
            await  this.petService.update(cpf,id,pet);
            return new ResultDto(null,true,model,null);
        }catch(ex){
            throw new HttpException(new ResultDto('Não foi possível atualizar o cadastro',false,null,ex),HttpStatus.BAD_REQUEST);
        }
    }
}
