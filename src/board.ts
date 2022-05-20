import { Coordinates } from './coordinates';

export class Board {
    height: number = 0;
    width: number = 0;

    constructor(input: {height: number, width: number} | Board) {
        if(input instanceof Board) {
            Object.assign(this, input);
        } else {
            this.height = input.height;
            this.width = input.width;
        }
    }


    validPosition(coordinates: Coordinates): boolean {
        const {x, y} = coordinates;
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
}
