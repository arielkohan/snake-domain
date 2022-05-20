import { Snake } from './snake';
import { Board } from './board';
import { Coordinates } from './coordinates';

export function choiceNewFoodPlacement(snake: Snake, board: Board): Coordinates {
    let coordinates: Coordinates = {x: -1, y: -1};
    do {
        coordinates.x = Math.floor(Math.random() * board.width);
        coordinates.y = Math.floor(Math.random() * board.height);
    } while(snake.passingThroughCoordinates(coordinates));

    return coordinates;
}