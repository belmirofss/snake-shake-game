import { Point } from "./Point.model";
import { Snake } from "./Snake.model";

export class Board {

    static readonly BOARD_SIZE = 15;

    rows: boolean[][];
    snake: Snake;

    constructor() {
        this.rows = [];
        this.snake = new Snake();

        for (let i = 0; i < Board.BOARD_SIZE; i++) {
            this.rows[i] = [];
    
            for (let j = 0; j < Board.BOARD_SIZE; j++) {
                this.rows[i][j] = false;
            } 
        }
    }

    isCollision(point: Point): boolean {
        return point.x === Board.BOARD_SIZE 
            || point.x === -1 
            || point.y === Board.BOARD_SIZE 
            || point.y === -1;
    }  
}