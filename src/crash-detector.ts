import { Board } from "./board";
import { CrashError, CrashType } from "./crash-error";
import { Snake } from "./snake";

export abstract class CrashDetector {
    abstract analyzeLastMovement(snake: Snake, board: Board): void;
    static getNewCrashDetector(): CrashDetector {
        return new CompositeCrashDetector();
    }
}

class CompositeCrashDetector extends CrashDetector {
    childDetectors: CrashDetector[] = [];

    constructor() {
        super();
        this.childDetectors.push(new SelfCrashDetector());
        this.childDetectors.push(new LimitsCrashDetector());
    }

    analyzeLastMovement(snake: Snake, board: Board): void {
        this.childDetectors.forEach(detector => detector.analyzeLastMovement(snake, board));
    }
}

class SelfCrashDetector extends CrashDetector {
    
    analyzeLastMovement(snake: Snake, _board: Board): void {
        const snakeCoordinates = snake.snakeCoordinates;
        const headCoordinates = snake.getHeadCoordinates();
        const collisions = snakeCoordinates
            .slice(1)
            .filter(c => c.x === headCoordinates.x && c.y === headCoordinates.y);
        
        if(collisions.length) {
            throw new CrashError(CrashType.CRASH_WITH_SELF, snakeCoordinates[1]);
        }
    }

}

class LimitsCrashDetector extends CrashDetector {
    
    analyzeLastMovement(snake: Snake, board: Board): void {
        const headCoordinates = snake.getHeadCoordinates();
        if(! board.validPosition(headCoordinates)) {
            const snakeCoordinates = snake.snakeCoordinates;
            throw new CrashError(CrashType.CRASH_WITH_LIMITS, snakeCoordinates[1]);
        }
    }

}



