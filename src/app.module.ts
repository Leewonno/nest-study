import { Module } from '@nestjs/common';
import { BoardModule } from './boards/board.module';
import { BoardsController } from './boards/boards.controller';
import { typeORMConfig } from './boards/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule,
    AuthModule],
})
export class AppModule {}
