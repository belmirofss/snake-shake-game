import { BOARD_SIZE } from "../constants/GameConfig.constants";
import { BoardPoint } from "./BoardPoint.model";
import { Snake } from "./Snake.model";

export class Board {

    rows: boolean[][];
    snake: Snake;

    constructor() {
        this.createNewGame();
    }

    createNewGame(): void {
        this.rows = [];
        this.snake = new Snake();

        for (let i = 0; i < BOARD_SIZE; i++) {
            this.rows[i] = [];
    
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.rows[i][j] = false;
            } 
        }
    }

    isCollision(point: BoardPoint): boolean {
        return point.row === BOARD_SIZE 
            || point.row === -1 
            || point.column === BOARD_SIZE 
            || point.column === -1;
    }  
}