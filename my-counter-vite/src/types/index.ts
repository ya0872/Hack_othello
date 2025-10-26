export type Player = 'black' | 'white';
export type Cell = 'black' | 'white' | 'null';
export type Board = Cell[][];
export type Position = {
    y: number;
    x: number;
}
export const history: Position[] = [];