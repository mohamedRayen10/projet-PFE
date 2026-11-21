import React, { useState } from "react";

const choices = ["🪨", "📄", "✂️"];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const play = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) setResult("Égalité !");
    else if (
      (choice === "🪨" && compChoice === "✂️") ||
      (choice === "📄" && compChoice === "🪨") ||
      (choice === "✂️" && compChoice === "📄")
    )
      setResult("Tu as gagné !");
    else setResult("Tu as perdu !");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black text-white">
      <h1 className="text-3xl font-bold text-indigo-300 mb-4">✊🖐✌️ Pierre-Feuille-Ciseaux</h1>
      <p className="text-sm text-gray-300 max-w-md mb-6 text-center">
        Choisissez entre 🪨 Pierre, 📄 Feuille ou ✂️ Ciseaux.
        Le jeu choisit au hasard pour l'ordinateur. Gagne si tu bats son choix !
      </p>
      <div className="flex gap-4 mb-6">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            className="text-3xl bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded"
          >
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && (
        <p className="text-lg">
          Toi : {playerChoice} | Ordinateur : {computerChoice} <br />
          <span className="font-bold text-yellow-300">{result}</span>
        </p>
      )}
    </div>
  );
};

export default RockPaperScissors;
