import {Routes, Route, Link} from 'react-router-dom'
import React from 'react';
import { useOthello } from './hooks/useOthello';
import Board from './components/Board';
import { HistoryPage } from './HistoryPage';

const App: React.FC = () => {
  const { board, handleCellClick, currentPlayer, score, winner,resetGame, message ,gameOver ,boardHistory} = useOthello();

  const GameUI: React.FC = () => (
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

  return (
    <div>
      {/* 6. 共通のナビゲーションヘッダー */}
      <nav style={{ padding: 10, background: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 20, fontSize: '18px', textDecoration: 'none' }}>
          ゲーム
        </Link>
        <Link to="/history" style={{ fontSize: '18px', textDecoration: 'none' }}>
          履歴再生
        </Link>
      </nav>

      {/* 7. URLに応じて表示を切り替える */}
      <Routes>
        {/* path="/" (ホーム) の時は、ゲーム画面(GameUI)を表示 */}
        <Route path="/" element={<GameUI />} />
        
        {/* path="/history" の時は、HistoryPage を表示 */}
        {/* App.tsx が持つ boardHistory を props として渡す */}
        <Route 
          path="/history" 
          element={<HistoryPage boardHistory={boardHistory} />} 
        />
      </Routes>
    </div>
  );
};

export default App;
