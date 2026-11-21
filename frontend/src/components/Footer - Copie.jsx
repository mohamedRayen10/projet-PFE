import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../../dist/assets/logo/imges.png";
import { BsFacebook, BsInstagram, BsTwitter, BsEnvelope, BsGeoAlt, BsPhone, BsChat } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border-t-4 border-red-500 bg-gray-900 text-white py-10">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid w-full gap-8 md:grid-cols-4">
          {/* 🌟 Logo & Présentation */}
          <div className="flex flex-col">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-14 w-auto cursor-pointer" />
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              CCCANTUN - Construisons ensemble l'avenir.  
              Rejoignez-nous sur nos plateformes pour rester informé.
            </p>
          </div>

          {/* 🔗 Liens rapides */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-3">Liens rapides</h2>
            <Link to="/" className="text-gray-400 hover:text-red-400 transition duration-300">
              Accueil
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-red-400 transition duration-300">
              À propos
            </Link>
            <Link to="/services" className="text-gray-400 hover:text-red-400 transition duration-300">
              Services
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-red-400 transition duration-300">
              Contact
            </Link>
          </div>

          {/* 📍 Contact */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
            <p className="flex items-center text-gray-400">
              <BsGeoAlt className="mr-2" /> 123 Rue de l’Innovation, Paris
            </p>
            <p className="flex items-center text-gray-400 mt-2">
              <BsEnvelope className="mr-2" /> contact@cccantun.com
            </p>
            <p className="flex items-center text-gray-400 mt-2">
              <BsPhone className="mr-2" /> +33 1 23 45 67 89
            </p>
          </div>

          {/* 📨 Newsletter */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-3">Newsletter</h2>
            <p className="text-gray-400 text-sm mb-3">
              Inscrivez-vous pour recevoir nos dernières actualités et offres spéciales.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full p-2 rounded-l-lg border-none focus:ring-2 focus:ring-red-400"
              />
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-r-lg transition duration-300">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* 📌 Outils & Ressources */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center">
          <div className="flex gap-6 sm:gap-12">
            <Link to="/privacy" className="text-gray-400 hover:text-red-400 transition duration-300">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-red-400 transition duration-300">
              Conditions d'utilisation
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-red-400 transition duration-300">
              FAQ
            </Link>
          </div>

          {/* 🚀 Réseaux sociaux */}
          <div className="flex gap-5 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl">
              <BsFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300 text-xl">
              <BsInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 text-xl">
              <BsTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition duration-300 text-xl">
              <BsChat />
            </a>
          </div>
        </div>

        {/* 📌 Ligne de séparation */}
        <Footer.Divider className="my-6 border-gray-700" />

        {/* ⚡ Copyright */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
          <Footer.Copyright
            href="#"
            by="CCCANTUN. Tous droits réservés. | Conception par <km/h>"
            year={new Date().getFullYear()}
            className="text-gray-500"
          />
        </div>
      </div>
    </Footer>
  );
}
