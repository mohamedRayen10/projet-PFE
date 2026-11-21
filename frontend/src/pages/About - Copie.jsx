import React, { useState } from 'react';
import Head2 from '../components/Head2';
import { ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

const team = [
  { name: 'Souad Siala', role: 'Présidente', photo: '/team/souad.jpg' },
  { name: 'Sabeur Cheikh', role: 'Président Comité Art Culinaire', photo: '/team/sabeur.jpg' },
  { name: 'Mourad Romdhane', role: 'Membre', photo: '/team/mourad.jpg' },
];

const timeline = [
  { year: '2016', event: 'Lancement du vol direct Montréal–Tunis avec Tunisair.' },
  { year: '2020', event: 'Expansion des partenariats en Afrique et dans la Région Arabe.' },
  { year: '2023', event: 'Présence au Salon International Tourisme Voyages à Montréal.' },
  { year: '2025', event: 'Nouveaux accords de coopération économique signés en Tunisie.' },
];

export default function About() {
  const [email, setEmail] = useState('');
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Merci pour votre inscription, ${email}!`);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-br from-red-600 via-white to-red-600 dark:from-red-800 dark:via-gray-900 dark:to-red-800 min-h-screen">
      <Head2 />
      <div className="container mx-auto px-6 py-16 space-y-20">

        {/* Core Info Card */}
        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">

          </div>
          <div className="pt-20 pb-12 px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 dark:text-red-400 text-center mb-8">
              À propos de la CCCT
            </h2>
            <ul className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {[
                'La CCCT promeut l\'échange commercial entre le Canada et la Tunisie.',
                'Participation au Salon International Tourisme Voyages du 03 au 05 novembre 2023 à Montréal.',
                'Échanges fructueux avec officiels, tours opérateurs, agences et compagnies aériennes.',
                'Félicitations à Tunisair et Air Canada pour leurs partenariats continus.'
              ].map((text, idx) => (
                <li key={idx} className="flex items-start">
                  <ArrowRight className="mt-1 mr-3 text-red-600 dark:text-red-400" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Notre Équipe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-center">
                <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{member.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Notre Histoire
          </h3>
          <ol className="relative border-l border-gray-300 dark:border-gray-600 ml-4">
            {timeline.map((item, idx) => (
              <li key={idx} className="mb-10 ml-6">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-red-600 dark:bg-red-800 rounded-full ring-4 ring-white dark:ring-gray-900">
                  <span className="text-white font-semibold text-sm">{item.year}</span>
                </span>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {item.event}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Contactez-Nous
          </h3>
          <div className="flex flex-col md:flex-row justify-around items-start text-gray-700 dark:text-gray-300 space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <MapPin className="text-red-600" />
              <span>Avenue Habib Bourguiba, Tunis, Tunisie</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-red-600" />
              <span>contact@ccct.tn</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-red-600" />
              <span>+216 71 000 000</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="https://twitter.com/ccct" target="_blank" rel="noopener noreferrer"><Twitter className="text-gray-500 hover:text-red-600" /></a>
            <a href="https://linkedin.com/company/ccct" target="_blank" rel="noopener noreferrer"><Linkedin className="text-gray-500 hover:text-red-600" /></a>
            <a href="https://instagram.com/ccct" target="_blank" rel="noopener noreferrer"><Instagram className="text-gray-500 hover:text-red-600" /></a>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Inscrivez-vous à notre newsletter
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              className="w-full md:w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button type="submit" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
              S'abonner
              <ArrowRight className="ml-2 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}