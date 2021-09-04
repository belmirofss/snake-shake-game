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

    isHead(point: Point): boolean {
        return this.parts[0].x === point.x && this.parts[0].y === point.y;
    }

    isPart(point: Point): boolean {
        return !!this.parts.find((part, index) => part.x === point.x && part.y === point.y && index !== 0);
    }

    isSelfCollision(point: Point): boolean {
        return this.isPart(point);
    };

    getNewHeadPosition(): Point {
        const newHead = Object.assign({}, this.parts[0]);

        if (this.direction === Direction.LEFT) {
            newHead.x -= 1;
        } else if (this.direction === Direction.RIGHT) {
            newHead.x += 1;
        } else if (this.direction === Direction.UP) {
            newHead.y -= 1;
        } else if (this.direction === Direction.DOWN) {
            newHead.y += 1;
        }

        return newHead;
    }

    getLastTail(): Point | undefined {
        return this.parts.pop();
    }
}