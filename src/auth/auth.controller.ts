import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialDto);
    }

    // AuthGuard()를 넣어줌으로서 유저 정보를 불러온다 / 토큰이 정상인지도 판단
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log(user);
    }
}
