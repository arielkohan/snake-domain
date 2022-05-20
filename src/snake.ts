import { Directions } from "./directions";
import { Coordinates } from './coordinates';


export class Snake {
    
    snakeCoordinates: Array<Coordinates> = [];
    private headCurrentDirection: Directions = Directions.RIGHT;
    private pendingDirectionCommands: Directions[] = [];
    private pendingTailToAdd: number = 0;

    constructor(input: Snake | {initialCoordinates: Coordinates, initialLength: number, initialDirection: Directions}) {
        if( input instanceof Snake ) {
            Object.assign(this, input);
        } else {
            this.headCurrentDirection = input.initialDirection;
            this.pendingDirectionCommands = [];
            this.pendingTailToAdd = input.initialLength - 1;
            this.snakeCoordinates = [input.initialCoordinates];
        }
    }
/* 
    getSnakeCoordinates(): Coordinates[] {
        return [...this.snakeCoordinates.map(coordinates => ({...coordinates}))];
    } */
    getHeadCoordinates(): Coordinates {
        return {...this.snakeCoordinates[0]};
    }

    passingThroughCoordinates(coordinates: Coordinates): boolean {
        return this.snakeCoordinates.some(c => c.x === coordinates.x && c.y === coordinates.y);
    }

    addDirectionCommand(newDirection: Directions) {
        const validDirection = this.newDirectionValid(newDirection);
        
        if(validDirection)
            this.pendingDirectionCommands.push(newDirection);
    }

    private newDirectionValid(newDirection: Directions) {
        let previousDirection = this.headCurrentDirection;
        if (this.pendingDirectionCommands.length) {
            previousDirection = this.pendingDirectionCommands[this.pendingDirectionCommands.length - 1];
        }

        const invalidDirection = (previousDirection === Directions.UP && newDirection === Directions.DOWN) ||
            (previousDirection === Directions.DOWN && newDirection === Directions.UP) ||
            (previousDirection === Directions.RIGHT && newDirection === Directions.LEFT) ||
            (previousDirection === Directions.LEFT && newDirection === Directions.RIGHT) ||
            previousDirection === newDirection
            ;
        return ! invalidDirection;
    }

    move(foodCoordinates: Coordinates): boolean {
        this.headCurrentDirection = this.pendingDirectionCommands.shift() || this.headCurrentDirection;
        const newHeadCoordinates: Coordinates = this.calculateHead( this.headCurrentDirection );
        this.snakeCoordinates.unshift(newHeadCoordinates);
        
        const eating = newHeadCoordinates.x === foodCoordinates.x && newHeadCoordinates.y === foodCoordinates.y;
        this.pendingTailToAdd += eating ? 1: 0;

        if(this.pendingTailToAdd > 0) {
            this.pendingTailToAdd--;
        } else {
            this.snakeCoordinates.pop();
        }
        return eating;
    }

    private calculateHead(direction: Directions): Coordinates {
        const headCurrentPosition = this.snakeCoordinates[0];
        switch(direction) {
            case Directions.UP:
                return {x: headCurrentPosition.x, y: headCurrentPosition.y - 1};
            case Directions.DOWN:
                return {x: headCurrentPosition.x, y: headCurrentPosition.y + 1};
            case Directions.RIGHT:
                return {x: headCurrentPosition.x + 1, y: headCurrentPosition.y};
            case Directions.LEFT:
                return {x: headCurrentPosition.x - 1, y: headCurrentPosition.y};
        }
    }



}