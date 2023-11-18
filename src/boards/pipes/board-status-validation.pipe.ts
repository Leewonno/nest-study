import { PipeTransform, ArgumentMetadata,BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board.status.enum";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value:any, metadata:ArgumentMetadata){

        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException("status에 잘못된 값이 들어왔습니다.");
        }

        console.log("value", value);
        console.log("metadata", metadata);

        return value;
    }

    private isStatusValid(status:any){
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}