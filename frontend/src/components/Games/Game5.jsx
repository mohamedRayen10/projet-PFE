import React, { useState, useEffect } from "react";

const ClickSpeedTest = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setActive(false);
    }
  }, [timeLeft, active]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setActive(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white">
      <h1 className="text-3xl font-bold text-blue-300 mb-4">⏱️ Click Speed Test</h1>
      <p className="text-sm text-gray-300 max-w-md mb-6 text-center">
        Cliquez sur le bouton autant de fois que possible en 10 secondes.
        Le but est d'obtenir le score le plus élevé !
      </p>
      <p className="mb-2 text-lg">Temps restant : {timeLeft}s</p>
      <p className="mb-4 text-lg">Score : {score}</p>
      <button
        onClick={() => active && setScore(score + 1)}
        disabled={!active}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded mb-4"
      >
        👆 Clique-moi !
      </button>
      {!active && (
        <button
          onClick={startGame}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ▶️ Lancer le jeu
        </button>
      )}
    </div>
  );
};

export default ClickSpeedTest;
