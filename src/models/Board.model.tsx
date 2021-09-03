import { Snake } from "./Snake.model";

export class Board {

    rows: boolean[][];
    snake: Snake;

    static readonly BOARD_SIZE = 15;

    constructor() {
        this.snake = new Snake();
        this.rows = [];

        for (let i = 0; i < Board.BOARD_SIZE; i++) {
            this.rows[i] = [];
    
            for (let j = 0; j < Board.BOARD_SIZE; j++) {
                this.rows[i][j] = false;
            } 
        }
    }
}