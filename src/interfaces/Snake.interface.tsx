import { Direction } from "../enums/Directions.enum";
import { Point } from "./Point.interface";

export interface Snake {
    direction: Direction;
    parts: Point[];
}