import React from "react";
import Head2 from '../components/Head2';
const services = [
  {
    title: "Gestion des Membres",
    description:
      "*Base de données pour stocker et gérer les informations des membres (nom, contact, statut, historique d'adhésion, etc.)\n*Tableau de bord personnalisé pour chaque membre.\n*Notification par email et SMS pour les rappels d’adhésion ou d’événements.",
    image: "/images/ww1.png",
  },
  {
    title: "Adhésions :",
    description: "Formulaire d’inscription en ligne avec validation des informations.\n*Possibilité de télécharger des documents requis (statuts, justificatifs).\n*Suivi des statuts d’adhésion (actif, expiré, en attente).",
    image: "/images/ww2.png",
  },
  {
    title: "Paiements en Ligne :",
    description: "Intégration de plateformes de paiement sécurisées (PayPal, Stripe, ou solutions bancaires locales).\n*Génération de reçus automatiques après paiement.\n*Suivi des transactions avec rapports financiers automatisés.",
    image: "/images/ww3.png",
  },
  {
    title: "Gestion des Événements :",
    description:
      "*Calendrier interactif pour les événements de la CCCT (conférences, séminaires, rencontres B2B).\n*Inscription en ligne aux événements avec options de paiement.\n*Envoi de rappels et d'informations aux participants.",
    image: "/images/ww4.png", // à remplacer avec ta vraie image
  },
  {
    title: "Rapports et Analyses :",
    description:
      "*Tableau de bord pour les administrateurs avec statistiques en temps réel sur les adhésions, les paiements et la participation.\n*Génération de rapports pour le suivi des KPI.",
    image: "/images/ww5.png", // à remplacer avec ta vraie image
  },
  {
    title: "Communication :",
    description:
      "*Blog pour publier des actualités et des opportunités commerciales.\n*Newsletter pour maintenir les membres informés.\n*Forum ou espace d’échange entre les membres.",
    image: "/images/ww6.png", // à remplacer avec ta vraie image
  },
];

const Service = () => {
  return (
    <div><Head2 />
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-10 text-center">Nos Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-contain mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Service;
