import { Injectable, NotFoundException } from '@nestjs/common';
// import { BoardStatus } from './board.status.enum';
// import {v1 as uuid} from "uuid";
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    // 게시물 생성하기
    createBoard(createBoardDto: CreateBoardDto, user:User):Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto, user);
    }
    
    // 특정 게시물 가져오기
    async getBoardById(id:number): Promise<Board>{
        const found = await this.boardRepository.findOne({
            where: { id },
        });

        if(!found){
            throw new NotFoundException("아이디를 찾을 수 없습니다.");
        }

        return found;
    }

    async deleteBoard(id:number):Promise<void>{
        const result = await this.boardRepository.delete(id);

        // delete는 없어도 에러가 발생하지 않기 때문에
        // 에러를 발생시켜주도록함
        if(result.affected === 0){
            throw new NotFoundException('아이디를 찾을 수 없습니다.');
        }

        console.log(result);
    }

    // 게시물 업데이트
    async updateBoard(id:number, status:BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);
        board.status = status;

        await this.boardRepository.save(board);

        return board;
    }

    async getAllBoards():Promise<Board[]>{

        const boards = await this.boardRepository.find();

        return boards;
    }

    async getUserBoards(user:User):Promise<Board[]>{

        const query = this.boardRepository.createQueryBuilder('board');
        
        query.where('board.userId = :userId', {userId: user.id});
        const boards = await query.getMany();

        return boards;
    }


    // private boards:Board[] = [{
    //     id:"100",
    //     title:"제목",
    //     description:"설명",
    //     status: BoardStatus.PUBLIC,
    // }];

    // getAllBoards():Board[] {
    //     return this.boards;
    // }

    // createBoard(CreateBoardDto: CreateBoardDto){
    //     const {title, description} = CreateBoardDto;
    //     const board: Board = {
    //         id:uuid(),
    //         title : title,
    //         description : description,
    //         status: BoardStatus.PUBLIC,
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id:string):Board{
    //     const found = this.boards.find((boards)=> boards.id === id );
    //     if(!found){
    //         throw new NotFoundException("존재하지 않는 아이디 입니다.");
    //     }

    //     return found;
    // }

    // deleteBoard(id:string):void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board)=>board.id !== found.id);

    //     return 
    // }

    // updateBoardStatus(id:string, status:BoardStatus):Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

}
