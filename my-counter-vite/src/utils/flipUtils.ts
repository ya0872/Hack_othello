import type {Board, Player} from "../types";
type Position = {x: number; y: number};

export const getFlippableStones = (
    board: Board, x: number, y: number, player: Player
): Position[] => {
    const opponent: Player = player === "black" ? "white" : "black";
    const flippable: Position[] = [];

    const directions = [
        {dx: 0, dy: -1},
        {dx: 0, dy: 1},
        {dx: -1, dy: 0},
        {dx: 1, dy: 0},
        {dx: -1, dy: -1},
        {dx: 1, dy: -1},
        {dx: -1, dy: 1},
        {dx: 1, dy: 1},
    ];

    for (const dir of directions){
        let nx = x + dir.dx;
        let ny = y + dir.dy;
        const line: Position[] = [];

        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8){
            const cell = board[ny][nx];
            if (cell === opponent) {
                line.push({x: nx, y: ny});
            }else if(cell === player){
                flippable.push(...line);
                break;
            }else{
                break;
            }
            nx += dir.dx;
            ny += dir.dy;
        }
    }
    return flippable;
};