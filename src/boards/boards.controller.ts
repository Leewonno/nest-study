import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService:BoardsService){}


    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto:CreateBoardDto,
    @GetUser() user:User):Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto, user)
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number):Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id):Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
    ){
        return this.boardsService.updateBoard(id, status);
    }

    @Get('')
    getAllBoard():Promise<Board[]>{
        return this.boardsService.getAllBoards();
    }

    @Get('/user')
    getUserBoard(@GetUser() user:User):Promise<Board[]>{
        return this.boardsService.getUserBoards(user);
    }

    // // Board Service를 Board Controller에서 이용할 수 있게 해주기
    // constructor(private boardsService:BoardsService){  }

    // @Get('/')
    // getAllBoard():Board[]{
    //     return this.boardsService.getAllBoards();
    // }

    // @Post('/')
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() CreateBoardDto : CreateBoardDto
    // ):Board {
    //     return this.boardsService.createBoard(CreateBoardDto);
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id:string):Board{
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/delete/:id')
    // deleteBoard(@Param('id') id:string ){
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status:BoardStatus
    // ){
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
