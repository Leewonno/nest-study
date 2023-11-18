import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @IsString()
    @MinLength(4)
    @MaxLength(25)
    // 영어와 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message:"비밀번호는 영어나 숫자만 이용할 수 있습니다."
    })
    password:string;
}