import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { ResultDto } from "../../modules/backoffice/dtos/result.dto";
import { Contract } from "./contract";


export class ValidatorInterceptor implements NestInterceptor{

    constructor(public contract: Contract){

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);
        if(!valid){
            throw new HttpException(new ResultDto('Ops, algo deu errado',false,null,this.contract.erros), HttpStatus.BAD_REQUEST);
        }
        return next.handle();
    }

}
