import React from "react";
import { Link } from "react-router-dom";

const GameCards = () => {
  const games = [
    { name: "Tic Tac Toe", icon: "🎮", link: "/TicTacToe" },
    { name: "Guess The Number", icon: "Num❓", link: "/GuessTheNumber" },
    { name: "Memory Game", icon: "🧠", link: "/MemoryGame" },
    { name: "Rock Paper Scissors", icon: "🪨📄✂️", link: "/RockPaperScissors" },
    { name: "Click Speed Test", icon: "🏃‍♀️", link: "/ClickSpeedTest" },
    { name: "Mini Quiz", icon: "❓", link: "/MiniQuiz" },
  ];

  return (
    <div
      className="min-h-screen bg-[url('/images/bgg.jpg')] bg-cover bg-center bg-fixed animate-scroll-bg 
                 text-white flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold mb-8">🎮 Choisissez un Jeu</h1>
      <div className="grid grid-cols-2 gap-6">
        {games.map((game, index) => (
          <Link
            to={game.link}
            key={index}
            className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-6 w-48 text-center hover:bg-gray-700 transition-all"
          >
            <div className="text-4xl mb-4">{game.icon}</div>
            <h2 className="text-xl font-bold">{game.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameCards;
