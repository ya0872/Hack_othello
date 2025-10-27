import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { type BoardHistory } from './types'; // 型定義をインポート
import Board from './components/Board'; // Boardコンポーネントをインポート

// App.tsx から boardHistory を Props として受け取る
interface HistoryPageProps {
  boardHistory: BoardHistory;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ boardHistory }) => {
  // 何手目を表示しているかを管理する state
  const [stepNumber, setStepNumber] = useState(0);

  // boardHistory が未定義（ゲーム開始直後など）の場合に備えてデフォルト値（空配列）を指定
  const history = boardHistory ?? [];
  const currentBoard = history[stepNumber];

  // 履歴の盤面がない場合は何も表示しない
  if (!currentBoard) {
    return (
      <div style={{ padding: 20 }}>
        <nav>
          <Link to="/">ゲームに戻る</Link>
        </nav>
        <h2>履歴再生</h2>
        <p>まだ履歴がありません。</p>
      </div>
    );
  }

  const goToStep = (step: number) => {
    if (step >= 0 && step < history.length) {
      setStepNumber(step);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/">ゲームに戻る</Link>
      </nav>
      <h2>履歴再生（{stepNumber} 手目 / {history.length - 1} 手）</h2>
      
      {/* 履歴ページではセルをクリックしても何も起こらないようにする */}
      <Board board={currentBoard} onCellClick={() => {}} /> 
      
      {/* 再生用コントロール */}
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={() => goToStep(0)} disabled={stepNumber === 0}>
          最初へ
        </button>
        <button onClick={() => goToStep(stepNumber - 1)} disabled={stepNumber === 0}>
          一手戻る
        </button>
        <button onClick={() => goToStep(stepNumber + 1)} disabled={stepNumber === history.length - 1}>
          一手進む
        </button>
        <button onClick={() => goToStep(history.length - 1)} disabled={stepNumber === history.length - 1}>
          最後へ
        </button>
      </div>
      
      {/* 再生用スライダー */}
      <input
        type="range"
        min="0"
        max={history.length - 1}
        value={stepNumber}
        onChange={(e) => setStepNumber(Number(e.target.value))}
        style={{ width: '100%', maxWidth: '400px', marginTop: 15 }}
      />
    </div>
  );
};