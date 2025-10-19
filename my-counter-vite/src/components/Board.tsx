import React from 'react';
import {type Board as BoardType} from '../types';
import Cell from './Cell';

interface BoardProps {
    board: BoardType;
    onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({board, onCellClick}) => {
    return (
        <div style = {{display: 'grid', gridTemplateColumns: 'repeat(8, 50px)'}} >
            {board.map((row, rIdx) => row.map((cell, cIdx) => (
                <Cell key = {`${rIdx}-${cIdx}`} value = {cell} onClick={() => onCellClick(rIdx, cIdx)}/>
            ))
            )}
        </div>
    );
};

export default Board;