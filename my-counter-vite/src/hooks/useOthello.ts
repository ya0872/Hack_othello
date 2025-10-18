import {useState} from 'react';
import type { Board, Player,} from "../types";
import {FirstOthelloBoard} from "../utils/othello";
import {getFlippableStones} from "../utils/flipUtils";

export const useOthello = () => {
    const [board, setBoard] = useState<Board>(FirstOthelloBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>("black");
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<{black: number; white: number}>({
        black:2, white:2,
    });
    const [winner, setWinner] = useState<"black" | "white" | "draw" | null>(null);
    const [message, setMessage] = useState<string>("");


    const handleCellClick =  (y: number, x: number) => {
        setMessage("");
        if (gameOver) return;
        if (board[y][x] !== null) return;

        const flippable = getFlippableStones(board, x, y, currentPlayer);
        if (flippable.length === 0) return;

        const newBoard: Board = board.map(row => [...row]);
        newBoard[y][x] = currentPlayer;
        flippable.forEach(pos =>{
            newBoard[pos.y][pos.x] = currentPlayer;
        });

        setBoard(newBoard);
        updateScore(newBoard);

        switchPlayer(newBoard); 
    };

    const switchPlayer = (currentBoard: Board) => { 
    const nextPlayer: Player = currentPlayer === "black" ? "white" : "black";
        if (hasValidMove(currentBoard, nextPlayer)) {
            setCurrentPlayer(nextPlayer);
            setMessage(""); 
        } else if (hasValidMove(currentBoard, currentPlayer)) {
            setMessage(`${nextPlayer === "black" ? "黒" : "白"}は置ける場所がありません。スキップ`);
        } else {
            setGameOver(true);
            if (score.black > score.white) setWinner("black");
            else if (score.white > score.black) setWinner("white");
            else setWinner("draw");
            setMessage("");
        }
    };



    const updateScore = (board: Board) => {
        let black = 0;
        let white = 0;
        board.forEach(row => row.forEach(cell => {
            if (cell === "black") black++;
            if (cell === "white") white++;
        }));
        setScore({ black, white });
    };
    
    const hasValidMove = (board: Board, player: Player) => {
        for (let y = 0; y < 8; y++){
            for (let x = 0; x < 8; x++){
                if(board[y][x] === null && getFlippableStones(board, x, y, player).length > 0){
                    return true;
                } 
            }
        }
        return false;
    };
    

    return{
        board, currentPlayer, gameOver, score, handleCellClick, winner, message
    };
};
