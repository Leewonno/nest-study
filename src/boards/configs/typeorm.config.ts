// 타입ORM 설정파일

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "../board.entity";
import { User } from "src/auth/user.entity";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'pyjsok5253!',
    database:'board-app',
    entities:[__dirname + '../**/*.entity.{js, ts}', Board, User],
    synchronize: true,
}