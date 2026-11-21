import React, { useState, useEffect } from "react";

const DiscordPage = () => {
  // Remplacez <SERVER_ID> par l’ID de votre serveur Discord
  const WIDGET_URL = "https://discord.com/api/guilds/<SERVER_ID>/widget.json";
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    fetch(WIDGET_URL)
      .then(res => res.json())
      .then(data => setOnlineCount(data.presence_count))
      .catch(() => {});
  }, []);

  const roles = [
    { name: "Modérateurs", color: "bg-gradient-to-r from-red-500 to-red-700" },
    { name: "Développeurs", color: "bg-gradient-to-r from-green-500 to-green-700" },
    { name: "Membres", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { name: "Nouveaux", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
  ];

  const benefits = [
    "Rejoindre une communauté active et bienveillante",
    "Accéder à des ressources exclusives partagées par les membres",
    "Poser vos questions techniques en temps réel",
    "Participer à des défis et projets collaboratifs",
    "Recevoir de l’aide pour vos projets personnels",
    "Assister à des workshops et sessions live",
    "Découvrir des offres d’emploi et stages",
    "Partager vos travaux et recevoir des feedbacks",
    "Créer ou rejoindre des groupes thématiques",
    "Suivre les actualités CCCT en avant‑première",
  ];

  const testimonials = [
    { user: "Alice", quote: "Grâce au serveur CCCT, j'ai progressé en React !" },
    { user: "Bob", quote: "Une communauté toujours prête à aider, top !" },
    { user: "Claire", quote: "Les workshops sont super enrichissants." },
    { user: "David", quote: "J'y ai trouvé des partenaires pour mon projet." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="backdrop-blur-lg bg-white/20 border border-white/10 rounded-3xl shadow-2xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        {/* Colonne de gauche */}
        <div className="flex flex-col items-center space-y-6">
          <img
            src="https://img.icons8.com/color/200/discord-logo.png"
            alt="Discord Logo"
            className="w-40 h-40 animate-pulse"
          />
          <p className="text-white text-lg">
            Membres en ligne : <span className="font-bold">{onlineCount}</span>
          </p>
          <iframe
            src="https://discord.com/widget?id=<SERVER_ID>&theme=dark"
            title="Discord Widget"
            className="w-full h-64 rounded-lg border-0 shadow-lg"
            allowTransparency="true"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
        </div>

        {/* Colonne de droite */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-300 mb-5">
            Serveur Discord Officiel CCCT
          </h1>
          <p className="text-gray-200 mb-8">
            Rejoignez notre communauté pour échanger, apprendre et collaborer autour de CCCT.
          </p>

          {/* Rôles */}
          <ul className="flex flex-wrap gap-3 mb-8">
            {roles.map((r) => (
              <li
                key={r.name}
                className={`${r.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-inner hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200`}
              >
                {r.name}
              </li>
            ))}
          </ul>

          {/* Avantages */}
          <ul className="list-disc list-inside text-gray-200 mb-8 space-y-3 pl-4">
            {benefits.map((b, i) => (
              <li
                key={i}
                className="relative before:content-['✔'] before:text-indigo-400 before:absolute before:-left-6 hover:translate-x-2 transition-transform duration-200"
              >
                {b}
              </li>
            ))}
          </ul>

          {/* Témoignages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl italic text-gray-100 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                “{t.quote}”
                <footer className="mt-3 text-sm text-gray-400">— {t.user}</footer>
              </blockquote>
            ))}
          </div>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Foire aux questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-800 bg-opacity-50 p-5 rounded-lg shadow-inner">
                <summary className="cursor-pointer font-semibold text-indigo-200">
                  Comment rejoindre un canal vocal ?
                </summary>
                <p className="mt-3 text-gray-300">
                  Cliquez sur l’un des canaux vocaux listés dans la barre latérale gauche et autorisez l’accès microphone.
                </p>
              </details>
              <details className="bg-gray-800 bg-opacity-50 p-5 rounded-lg shadow-inner">
                <summary className="cursor-pointer font-semibold text-indigo-200">
                  Comment obtenir des rôles ?
                </summary>
                <p className="mt-3 text-gray-300">
                  Répondez aux questions d’onboarding dans le salon #bienvenue pour recevoir automatiquement vos rôles.
                </p>
              </details>
            </div>
          </section>

          {/* Newsletter équilibrée */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Restez informé</h2>
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 px-5 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="flex-1 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white font-bold shadow-md transform hover:scale-105 transition-all duration-200"
              >
                S’inscrire
              </button>
            </form>
          </section>

          {/* Événements */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Événements à venir</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=ton_calendrier_public&amp;mode=AGENDA"
              className="w-full h-56 rounded-lg border-0 shadow-lg"
              loading="lazy"
            />
          </section>

          {/* Réseaux sociaux */}
          <section className="mb-8 flex justify-center gap-6 text-3xl">
            <a href="https://twitch.tv/ton_serveur" target="_blank" rel="noopener noreferrer" className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-indigo-500 transform hover:scale-110 transition-all duration-200">
              <i className="fab fa-twitch"></i>
            </a>
            <a href="https://youtube.com/ta_chaîne" target="_blank" rel="noopener noreferrer" className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all duration-200">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://twitter.com/ton_compte" target="_blank" rel="noopener noreferrer" className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-blue-400 transform hover:scale-110 transition-all duration-200">
              <i className="fab fa-twitter"></i>
            </a>
          </section>

          {/* Commandes Bot */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Commandes rapides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-gray-800 bg-opacity-60 p-5 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
                <p className="font-semibold text-white">!help</p>
                <p className="text-gray-300">Affiche toutes les commandes disponibles.</p>
              </div>
              <div className="bg-gray-800 bg-opacity-60 p-5 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
                <p className="font-semibold text-white">!events</p>
                <p className="text-gray-300">Liste des événements à venir.</p>
              </div>
              <div className="bg-gray-800 bg-opacity-60 p-5 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
                <p className="font-semibold text-white">!roles</p>
                <p className="text-gray-300">Affiche les rôles auto‑assignables.</p>
              </div>
              <div className="bg-gray-800 bg-opacity-60 p-5 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
                <p className="font-semibold text-white">!link</p>
                <p className="text-gray-300">Renvoie le lien d’invitation.</p>
              </div>
            </div>
          </section>

          {/* Bouton d’invitation */}
          <div className="mt-auto text-center md:text-left">
            <a
              href="https://discord.gg/vQseD4ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-extrabold py-4 px-8 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Rejoindre le serveur
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordPage;