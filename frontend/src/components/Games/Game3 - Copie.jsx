import React, { useEffect, useState } from "react";

const initialCards = ["🐶", "🐱", "🦁", "🐸", "🐵", "🐰"];
const shuffledCards = () =>
  [...initialCards, ...initialCards]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffledCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards((prev) =>
          prev.map((card, i) =>
            i === first || i === second ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
      }

      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === first || i === second ? { ...card, flipped: false } : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const handleFlip = (index) => {
    if (
      flippedCards.length < 2 &&
      !cards[index].flipped &&
      !cards[index].matched
    ) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setCards(shuffledCards());
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold text-green-400 mb-3">🧠 Memory Game</h1>

      {/* Définition du jeu */}
      <p className="text-sm text-gray-300 mb-6 max-w-md text-center">
        Retournez deux cartes à la fois pour trouver les paires identiques.
        Si les deux cartes sont les mêmes, elles restent visibles.
        Essayez de toutes les retrouver avec le moins d'essais possible !
      </p>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleFlip(index)}
            className={`w-20 h-20 text-3xl flex items-center justify-center rounded shadow-md transition-all
              ${
                card.flipped || card.matched
                  ? "bg-white text-black"
                  : "bg-green-700 hover:bg-green-600"
              }`}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </button>
        ))}
      </div>

      <p className="mt-6 text-gray-300">Paires trouvées : {matchedPairs} / {initialCards.length}</p>

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        🔄 Recommencer
      </button>
    </div>
  );
};

export default MemoryGame;
