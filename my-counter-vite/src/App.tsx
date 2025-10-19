import React from 'react';
import { useOthello } from './hooks/useOthello';
import Board from './components/Board';

const App: React.FC = () => {
  const { board, handleCellClick, currentPlayer, score, winner,resetGame, message ,gameOver } = useOthello();

  return (
    <div style={{ padding: 20 }}>
      <h1>オセロゲーム</h1>
      <button onClick={resetGame} style={{ marginTop: 20 }}>
        リセット
      </button>
      <h2>手番: {currentPlayer === "black" ? "黒" : "白"}</h2>
      <Board board={board} onCellClick={handleCellClick} />
      <div>黒: {score.black} / 白: {score.white}</div>
      <h3>{message}</h3>

        {gameOver && (
          <h2>
            {winner === "draw" ? "引き分け": winner === "black" ? "黒の勝ち" : "白の勝ち"}
          </h2>
        )}
      </div>
  );
};

export default App;
