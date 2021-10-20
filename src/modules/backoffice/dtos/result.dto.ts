import { ApiProperty } from "@nestjs/swagger"

export class ResultDto {
    constructor(
         message: string,
         success: boolean,
         data: any,
         errors: any,
    ) {
        this.message = message;
        this.success = success;
        this.errors = errors;
        this.data = data;
    }

    @ApiProperty()
    message: string

    @ApiProperty()
    success: boolean

    @ApiProperty()
    data: any

    @ApiProperty()
    errors: any
}
