import React, { useState, useEffect } from "react";

// Questions de culture générale (50 exemples fixes)
const cultureQuestions = [
  { q: "Quelle est la capitale de l’Espagne ?", a: "Madrid" },
  { q: "Quel est le plus grand océan du monde ?", a: "Pacifique" },
  { q: "Qui a peint la Joconde ?", a: "Léonard de Vinci" },
  { q: "Combien de continents existe-t-il ?", a: "7" },
  { q: "Quelle est la planète la plus proche du Soleil ?", a: "Mercure" },
  { q: "Qui a remporté la Coupe du Monde 2018 ?", a: "France" },
  { q: "Qui a écrit 'Les Misérables' ?", a: "Victor Hugo" },
  { q: "Dans quel pays se trouve la Tour de Pise ?", a: "Italie" },
  { q: "Quel est l’élément chimique H ?", a: "Hydrogène" },
  { q: "Combien de jours y a-t-il en une année bissextile ?", a: "366" },
  { q: "Quelle est la monnaie du Japon ?", a: "Yen" },
  { q: "En quelle année a eu lieu le débarquement en Normandie ?", a: "1944" },
  { q: "Combien de côtés a un hexagone ?", a: "6" },
  { q: "Quelle est la capitale du Canada ?", a: "Ottawa" },
  { q: "Qui a découvert l’Amérique ?", a: "Christophe Colomb" },
  { q: "Quelle est la langue parlée au Brésil ?", a: "Portugais" },
  { q: "Quel est le plus long fleuve du monde ?", a: "Nil" },
  { q: "Quelle est la plus haute montagne du monde ?", a: "Everest" },
  { q: "Quel est l’organe qui pompe le sang ?", a: "Cœur" },
  { q: "Combien de planètes dans le système solaire ?", a: "8" },
  { q: "Quel pays a pour capitale Canberra ?", a: "Australie" },
  { q: "Qui a inventé le téléphone ?", a: "Alexander Graham Bell" },
  { q: "Quel est le symbole chimique de l’or ?", a: "Au" },
  { q: "Quelle ville est surnommée la Ville Lumière ?", a: "Paris" },
  { q: "Quel animal est le roi de la savane ?", a: "Lion" },
  { q: "Quel pays a une feuille d’érable sur son drapeau ?", a: "Canada" },
  { q: "Quelle est la capitale de l’Allemagne ?", a: "Berlin" },
  { q: "Quel est l’animal emblème de la Chine ?", a: "Panda" },
  { q: "Combien y a-t-il de lettres dans l’alphabet français ?", a: "26" },
  { q: "Quel est le métal utilisé pour fabriquer les canettes ?", a: "Aluminium" },
  { q: "Quel est le plus grand désert du monde ?", a: "Sahara" },
  { q: "Dans quel sport utilise-t-on une raquette ?", a: "Tennis" },
  { q: "Qui a peint 'La Nuit étoilée' ?", a: "Van Gogh" },
  { q: "Combien de pattes a une araignée ?", a: "8" },
  { q: "Quel est l’ingrédient principal du guacamole ?", a: "Avocat" },
  { q: "Quel est le pays d’origine du flamenco ?", a: "Espagne" },
  { q: "Quel est le plus petit pays du monde ?", a: "Vatican" },
  { q: "Quel gaz respire-t-on pour vivre ?", a: "Oxygène" },
  { q: "Quelle est la capitale du Maroc ?", a: "Rabat" },
  { q: "Combien de zéros dans un million ?", a: "6" },
  { q: "Quel est l’auteur de 'Harry Potter' ?", a: "J.K. Rowling" },
  { q: "Combien y a-t-il de mois dans une année ?", a: "12" },
  { q: "Quel est le métal précieux jaune ?", a: "Or" },
  { q: "Quel est le plat national du Japon ?", a: "Sushi" },
  { q: "Quel est le sport national des États-Unis ?", a: "Baseball" },
  { q: "Quel est le pays des pyramides ?", a: "Égypte" },
  { q: "Quel est le satellite naturel de la Terre ?", a: "Lune" },
  { q: "Qui a écrit 'Roméo et Juliette' ?", a: "Shakespeare" },
  { q: "Quelle est la boisson la plus consommée au monde ?", a: "Eau" },
];

// Questions géographiques (30 exemples)
const geoQuestions = [
  { q: "Quelle est la capitale de l'Italie ?", a: "Rome" },
  { q: "Quel est le plus grand pays du monde en superficie ?", a: "Russie" },
  { q: "Quel océan borde l'Australie ?", a: "Océan Pacifique" },
  { q: "Dans quel pays se trouve la ville de Marrakech ?", a: "Maroc" },
  { q: "Quel est le plus haut sommet d'Afrique ?", a: "Mont Kilimandjaro" },
  { q: "Dans quelle mer se situe l'île de Corfou ?", a: "Mer Ionienne" },
  { q: "Quelle est la plus grande île du monde ?", a: "Groenland" },
  { q: "Quel est le plus grand pays d'Afrique ?", a: "Algérie" },
  { q: "Dans quel pays se trouve la ville de Reykjavik ?", a: "Islande" },
  { q: "Combien de pays composent l'Union Européenne ?", a: "27" },
  { q: "Quelle est la capitale de l'Inde ?", a: "New Delhi" },
  { q: "Quel est le plus grand désert de sable ?", a: "Désert du Sahara" },
  { q: "Quel pays est traversé par le Nil ?", a: "Égypte" },
  { q: "Quelle mer borde la Turquie ?", a: "Mer Méditerranée" },
  { q: "Quel est le pays le plus peuplé du monde ?", a: "Chine" },
  { q: "Où se trouve le Machu Picchu ?", a: "Pérou" },
  { q: "Quel est le pays avec la plus grande superficie forestière ?", a: "Russie" },
  { q: "Dans quel pays se trouve la ville de Petra ?", a: "Jordanie" },
  { q: "Dans quelle région se trouve le Mont Everest ?", a: "Himalaya" },
  { q: "Quel est le plus grand archipel du monde ?", a: "Indonésie" },
  { q: "Quelle mer borde la côte est de l'Italie ?", a: "Mer Adriatique" },
  { q: "Quelle ville est surnommée 'La Perle de l'Adriatique' ?", a: "Dubrovnik" },
  { q: "Quel est le plus grand lac d'eau douce ?", a: "Lac Baïkal" },
  { q: "Quel est le pays le plus petit du monde ?", a: "Vatican" },
  { q: "Quel pays a la plus grande population en Afrique ?", a: "Nigeria" },
  { q: "Quelle ville est connue sous le nom de 'Venise du Nord' ?", a: "Saint-Pétersbourg" },
  { q: "Quel est le plus grand volcan actif du monde ?", a: "Mauna Loa" },
  { q: "Quelle est la capitale de la Belgique ?", a: "Bruxelles" },
  { q: "Dans quelle mer se trouve la Grèce ?", a: "Mer Égée" },
  { q: "Quel est le pays d'origine du chocolat ?", a: "Mexique" },
];

// Génère des questions mathématiques (450 exemples)
const mathQuestions = Array.from({ length: 450 }, (_, i) => {
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  return {
    q: `Combien font ${a} + ${b} ?`,
    a: `${a + b}`,
  };
});

// Fonction pour mélanger les questions
const getQuestionsByCategory = (category) => {
  switch (category) {
    case "Culture":
      return cultureQuestions;
    case "Geography":
      return geoQuestions;
    case "Maths":
      return mathQuestions;
    default:
      return [];
  }
};

const MiniQuiz = () => {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Culture");
  const [timer, setTimer] = useState(30);

  const questions = getQuestionsByCategory(category);
  const current = questions[index];

  // Timer pour chaque question
  useEffect(() => {
    if (timer > 0 && index < questions.length) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, index]);

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === current.a.toLowerCase()) {
      setScore(score + 1);
      setMessage("✅ Bonne réponse !");
    } else {
      setMessage(`❌ Mauvaise réponse. La bonne réponse était : ${current.a}`);
    }

    setTimeout(() => {
      setAnswer("");
      setMessage("");
      setIndex(index + 1);
      setTimer(30);
    }, 1500);
  };

  const resetQuiz = () => {
    setIndex(0);
    setAnswer("");
    setScore(0);
    setMessage("");
    setTimer(30);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-900 to-black text-white px-4">
      <h1 className="text-3xl font-bold text-yellow-300 mb-4">📚 Mini Quiz</h1>

      <p className="text-sm text-gray-300 mb-6 max-w-md text-center">
        Choisissez une catégorie et testez vos connaissances ! Vous avez 30 secondes par question.
      </p>

      {/* Sélection de catégorie */}
      <div className="flex mb-6">
        <button onClick={() => setCategory("Culture")} className="bg-blue-500 px-4 py-2 rounded mr-4">
          Culture
        </button>
        <button onClick={() => setCategory("Geography")} className="bg-blue-500 px-4 py-2 rounded mr-4">
          Géographie
        </button>
        <button onClick={() => setCategory("Maths")} className="bg-blue-500 px-4 py-2 rounded">
          Mathématiques
        </button>
      </div>

      {/* Affichage de la question et timer */}
      {index < questions.length ? (
        <>
          <p className="text-lg mb-2">{current.q}</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-black px-4 py-2 rounded mb-3"
            placeholder="Votre réponse"
          />
          <button
            onClick={checkAnswer}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-bold"
          >
            Vérifier
          </button>
          <p className="mt-4 text-yellow-200">{message}</p>
          <p className="mt-2 text-white">Temps restant : {timer}s</p>
        </>
      ) : (
        <div className="text-center">
          <p className="text-xl font-bold text-green-300 mb-4">
            🎉 Quiz terminé ! Score : {score} / {questions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            🔄 Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniQuiz;
