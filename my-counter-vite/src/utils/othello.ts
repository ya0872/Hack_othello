import { type Board } from '../types';
export const FirstOthelloBoard = (): Board =>{
    const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
    board[3][4] = 'black'
    board[3][3] = 'white'
    board[4][3] = 'black'
    board[4][4] = 'white'
    return board;
};
/*export const clone = (): Board =>{
    
};  */