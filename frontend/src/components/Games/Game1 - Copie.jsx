// TicTacToe.jsx
import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  function renderSquare(i) {
    return (
      <button
        onClick={() => handleClick(i)}
        className={`w-20 h-20 text-3xl font-bold border border-red-700 
                    flex items-center justify-center 
                    ${
                      board[i]
                        ? "text-white"
                        : "hover:bg-red-900 text-red-400"
                    } bg-black`}
      >
        {board[i]}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-red-500 drop-shadow">
        🎮 Tic-Tac-Toe
      </h1>
      <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
        {board.map((_, idx) => renderSquare(idx))}
      </div>
      <p className="mt-4 text-xl">
        {winner
          ? `🔥 Gagnant : ${winner}`
          : board.every(Boolean)
          ? "⚖️ Match nul !"
          : `À ${isXNext ? "X" : "O"} de jouer`}
      </p>
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded shadow hover:bg-red-700 transition"
      >
        🔁 Recommencer
      </button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
