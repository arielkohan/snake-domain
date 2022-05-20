import { CrashDetector } from "./crash-detector";
import { Snake } from './snake';
import { Board } from './board';
import { Directions } from "./directions";
import { Coordinates } from './coordinates';
import { choiceNewFoodPlacement } from "./food-administrator";
import { CrashError } from "./crash-error";

export interface GameConfig {
    width: number,
    height: number,
}

export class Game {
    static crashDetector: CrashDetector = CrashDetector.getNewCrashDetector();

    playing: boolean = false;
    board: Board;
    snake: Snake;
    score: number = 0;
    foodCoordinates: Coordinates;
    crash: CrashError | null = null;

    constructor(game?: Game | GameConfig) {
        if(game && game instanceof Game) {
            Object.assign( this , game);
            this.board = new Board(game.board);
            this.snake = new Snake(game.snake);
            this.foodCoordinates = {...game.foodCoordinates}
        } else {
            const gameConfig = { height: game ? game.height : 20, width: game ? game.width : 20 };
            this.board = new Board(gameConfig);
            this.snake = new Snake({initialCoordinates: {x: Math.floor(gameConfig.width / 2), y: Math.floor(gameConfig.height / 2)}, initialDirection: Directions.RIGHT, initialLength: 4});
            this.score = 0;
            this.foodCoordinates = choiceNewFoodPlacement(this.snake, this.board);
            this.playing = false;
        }
    }

    play() {
        this.playing = true;
    }

    next() {
        try {
            const eating = this.snake.move(this.foodCoordinates);
            Game.crashDetector.analyzeLastMovement(this.snake, this.board);
            if(eating) {
                this.foodCoordinates = choiceNewFoodPlacement(this.snake, this.board);
                this.score++;
            }
        } catch(err) {
            if(err instanceof CrashError) {
                this.crash = err;
                this.playing = false;
            } else {
                throw err;
            }
        }
    }

    directionCommand(direction: Directions) {
        this.snake.addDirectionCommand(direction);
    }

}