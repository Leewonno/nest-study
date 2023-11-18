import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

// 다른데서도 주입해서 사용할 수 있게 Injectable()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){
        super({
            secretOrKey:"Secret1234",
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const {username} = payload;
        const user:User = await this.userRepository.findOne({where:{username}});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}