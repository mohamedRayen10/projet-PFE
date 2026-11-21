import React, { useState } from "react";

const GuessTheNumber = () => {
  const [target, setTarget] = useState(generateNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Entrez un nombre entre 1 et 100.");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("Veuillez entrer un nombre valide entre 1 et 100.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (num === target) {
      setMessage(`🎉 Bravo ! Vous avez deviné en ${attempts + 1} essais.`);
      setGameOver(true);
    } else if (num < target) {
      setMessage("🔼 Trop petit !");
    } else {
      setMessage("🔽 Trop grand !");
    }

    setGuess("");
  };

  const resetGame = () => {
    setTarget(generateNumber());
    setGuess("");
    setMessage("Entrez un nombre entre 1 et 100.");
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-3">
        🎯 Devine le Nombre
      </h1>

      {/* Définition du jeu */}
      <p className="text-sm text-gray-300 mb-6 max-w-md text-center">
        Le but du jeu est de deviner un nombre aléatoire entre 1 et 100.
        Après chaque tentative, vous recevrez un indice pour vous guider :
        "Trop petit", "Trop grand" ou "Bravo !".
      </p>

      <p className="mb-4">{message}</p>

      {!gameOver && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="px-4 py-2 rounded text-black"
            placeholder="Ex: 42"
          />
          <button
            onClick={handleGuess}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-bold"
          >
            Deviner
          </button>
        </div>
      )}

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
      >
        🔄 Recommencer
      </button>

      <p className="mt-4 text-sm text-gray-400">Essais : {attempts}</p>
    </div>
  );
};

export default GuessTheNumber;
