import { Direction } from "../enums/Directions.enum";
import { Point } from "./Point.model";

export class Snake {

    direction: Direction;
    parts: Point[];

    constructor() {
        this.direction =  Direction.LEFT;
        this.parts = [
            new Point(11, 1),
            new Point(12, 1),
            new Point(13, 1)
        ];
    }

    isHead(x: number, y: number): boolean {
        return this.parts[0].x === x && this.parts[0].y === y;
    }

    isPart(x: number, y: number): boolean {
        return !!this.parts.find((part, index) => part.x === x && part.y === y && index !== 0);
    }
}