import { Link } from "react-router-dom";
import Head2 from "../components/Head2";
import { useEffect, useState } from "react";
import NewsSwiper from "../components/NewsSwiper";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [myFormations, setMyFormations] = useState([]);
  const [showMyFormations, setShowMyFormations] = useState(false);

  // Initialiser les formations depuis localStorage
  useEffect(() => {
    const savedFormations = localStorage.getItem('myFormations');
    if (savedFormations) {
      setMyFormations(JSON.parse(savedFormations));
    }
  }, []);

  // Sauvegarder les formations dans localStorage
  useEffect(() => {
    if (myFormations.length > 0) {
      localStorage.setItem('myFormations', JSON.stringify(myFormations));
    }
  }, [myFormations]);

  // Base de données des formations
  const allFormations = [
    {
      id: 1,
      title: "Certification en Commerce International",
      description: "Masterisez les techniques de commerce international, les douanes et les procédures d'import-export.",
      price: "1,200 TND",
      duration: "60 heures",
      image: "/images/a.jpg",
      category: "Business",
      instructor: "Dr. Ahmed Ben Ali",
      rating: 4.8,
      students: 245
    },
    {
      id: 2,
      title: "Formation en Gestion d'Entreprise",
      description: "Apprenez à gérer efficacement votre entreprise avec des outils modernes de gestion.",
      price: "900 TND",
      duration: "45 heures",
      image: "/images/a.jpg",
      category: "Management",
      instructor: "Prof. Marie Dubois",
      rating: 4.6,
      students: 189
    },
    {
      id: 3,
      title: "Certificat en Marketing Digital",
      description: "Développez vos compétences en marketing digital et réseaux sociaux pour booster vos ventes.",
      price: "1,500 TND",
      duration: "80 heures",
      image: "/images/a.jpg",
      category: "Marketing",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 312
    },
    {
      id: 4,
      title: "Formation en Comptabilité Avancée",
      description: "Maîtrisez les principes comptables et fiscaux pour une gestion financière optimale.",
      price: "1,100 TND",
      duration: "70 heures",
      image: "/images/a.jpg",
      category: "Finance",
      instructor: "Mohamed Karoui",
      rating: 4.7,
      students: 178
    },
    {
      id: 5,
      title: "Certification en Négociation Commerciale",
      description: "Perfectionnez vos techniques de négociation pour des contrats gagnants.",
      price: "850 TND",
      duration: "40 heures",
      image: "/images/a.jpg",
      category: "Business",
      instructor: "Pierre Martin",
      rating: 4.5,
      students: 156
    },
    {
      id: 6,
      title: "Formation en E-commerce",
      description: "Créez et gérez votre boutique en ligne avec les dernières technologies e-commerce.",
      price: "1,300 TND",
      duration: "65 heures",
      image: "/images/a.jpg",
      category: "Digital",
      instructor: "Karim Tech",
      rating: 4.8,
      students: 267
    },
    {
      id: 7,
      title: "Certificat en Leadership",
      description: "Développez vos compétences en leadership et gestion d'équipe.",
      price: "950 TND",
      duration: "50 heures",
      image: "/images/a.jpg",
      category: "Management",
      instructor: "Nadia Leadership",
      rating: 4.4,
      students: 134
    },
    {
      id: 8,
      title: "Formation en Analyse Financière",
      description: "Apprenez à analyser les états financiers pour une prise de décision éclairée.",
      price: "1,400 TND",
      duration: "75 heures",
      image: "/images/a.jpg",
      category: "Finance",
      instructor: "Dr. Finance Expert",
      rating: 4.9,
      students: 198
    },
    {
      id: 9,
      title: "Certification en Vente Professionnelle",
      description: "Maîtrisez les techniques de vente modernes pour augmenter votre chiffre d'affaires.",
      price: "800 TND",
      duration: "35 heures",
      image: "/images/a.jpg",
      category: "Sales",
      instructor: "Alex Vendeur",
      rating: 4.3,
      students: 223
    },
    {
      id: 10,
      title: "Formation en Gestion de Projet",
      description: "Gérez vos projets efficacement avec les méthodologies Agile et Scrum.",
      price: "1,600 TND",
      duration: "90 heures",
      image: "/images/a.jpg",
      category: "Management",
      instructor: "Project Manager Pro",
      rating: 4.7,
      students: 289
    },
    {
      id: 13,
      title: "Certificat en Marketing Digital",
      description: "Développez vos compétences en marketing digital et réseaux sociaux pour booster vos ventes.",
      price: "1,500 TND",
      duration: "80 heures",
      image: "/images/a.jpg",
      category: "Marketing",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 312
    },
    {
      id: 12,
      title: "Formation en Comptabilité Avancée",
      description: "Maîtrisez les principes comptables et fiscaux pour une gestion financière optimale.",
      price: "1,100 TND",
      duration: "70 heures",
      image: "/images/a.jpg",
      category: "Finance",
      instructor: "Mohamed Karoui",
      rating: 4.7,
      students: 178
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/backend/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);
  
  // Ajouter une formation
  const addFormation = (formation) => {
    if (myFormations.length >= 5) {
      alert("Maximum 5 formations atteint! Veuillez supprimer une formation avant d'en ajouter une nouvelle.");
      return false;
    }
    
    if (myFormations.some(f => f.id === formation.id)) {
      alert("Cette formation est déjà dans votre liste!");
      return false;
    }
    
    setMyFormations([...myFormations, {...formation, addedDate: new Date().toLocaleDateString()}]);
    return true;
  };
  
  // Supprimer une formation
  const removeFormation = (id) => {
    setMyFormations(myFormations.filter(f => f.id !== id));
  };
  
  // Gérer l'achat
  const handlePurchase = (formation) => {
    const added = addFormation(formation);
    if (added) {
      setSelectedFormation(formation);
      setShowPurchaseSuccess(true);
      
      // Cacher le message après 3 secondes
      setTimeout(() => {
        setShowPurchaseSuccess(false);
      }, 3000);
    }
  };
  
  // Vider toutes les formations
  const clearAllFormations = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes vos formations?")) {
      setMyFormations([]);
      localStorage.removeItem('myFormations');
    }
  };
  
  return (
    <div>
      <Head2 />
      <NewsSwiper />

      {/* Bouton flottant pour mes formations */}
      {myFormations.length > 0 && (
        <button
          onClick={() => setShowMyFormations(true)}
          className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          title="Mes formations"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
            {myFormations.length}
          </span>
        </button>
      )}

      {/* Header Section */}

      {/* Project Description Section */}
      <div
        className="relative bg-fixed bg-center bg-cover bg-no-repeat py-20"
        style={{ backgroundImage: "url('/images/bgg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-10 max-w-7xl mx-auto">
          <img
            src="/images/ww7.png"
            alt="CCCT Banner"
            className="w-72 h-72 object-contain rounded-lg shadow-xl"
          />
          <div className="flex flex-col text-gray-100 flex-1">
            <h1 className="text-3xl font-bold md:text-5xl mb-6">Description du Projet</h1>
            <p className="text-lg leading-relaxed">
              Le projet consiste à concevoir et développer un site web performant pour la CCCT en mettant en œuvre 
              des solutions numériques avancées adaptées à une gestion efficace des adhésions, des paiements et des 
              interactions avec les membres. Ce projet s'appuie sur les compétences en Business Information Systems (BIS) 
              pour analyser, concevoir et implémenter une solution répondant aux besoins spécifiques de la CCCT.
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-12 max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg my-16">
        <img
          src="../../dist/assets/logo/imges.png"
          alt="CCCT Logo"
          className="w-48 h-48 object-contain animate-pulse"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bienvenue au CCCT</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            La CCCT promeut l'échange commercial entre le Canada, l'Afrique et la Région Arabe via la Tunisie
          </p>
          <Link
            to="/search"
            className="text-red-600 dark:text-red-400 font-semibold hover:underline flex items-center gap-2"
          >
            Voir toutes les publications
            <svg xmlns="../../dist/assets/logo/images.jpg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Valeur Ajoutée</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Automatisation des processus</h3>
                  <p className="text-gray-600 dark:text-gray-300">Réduction du temps de traitement des demandes</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Automatisation des processus chronophages.
                    <br />
                    Amélioration de l'expérience utilisateur pour les membres.
                    <br />
                    Réduction des erreurs grâce à des flux de travail numériques.
                    <br />
                    Renforcement de l'image professionnelle et innovante de la CCCT.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/ww9.png"
            alt="Value proposition"
            className="w-full lg:w-1/2 rounded-x shadow-xl"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 dark:bg-red-800 w-fit p-4 rounded-full mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Adhésion en Ligne</h3>
              <p className="text-gray-600 dark:text-gray-300">Rejoignez facilement la CCCT en quelques clics via notre plateforme en ligne.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 dark:bg-red-800 w-fit p-4 rounded-full mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8c-1.1 0-2 .9-2 2v2H8v4h8v-4h-2v-2c0-1.1-.9-2-2-2z" />
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Paiement Sécurisé</h3>
              <p className="text-gray-600 dark:text-gray-300">Effectuez vos transactions en toute sécurité grâce à nos solutions de paiement.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 dark:bg-red-800 w-fit p-4 rounded-full mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M12 14a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Réseautage</h3>
              <p className="text-gray-600 dark:text-gray-300">Rencontrez des professionnels, échangez et développez votre réseau d'affaires.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formations & Certifications Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Formations et Certifications
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Sélectionnez jusqu'à 5 formations - {myFormations.length}/5 sélectionnées
              </p>
            </div>
            
            {myFormations.length > 0 && (
              <button
                onClick={() => setShowMyFormations(true)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Voir mes formations ({myFormations.length})
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allFormations.map((formation) => {
              const isAdded = myFormations.some(f => f.id === formation.id);
              const isMaxReached = myFormations.length >= 5 && !isAdded;
              
              return (
                <div 
                  key={formation.id} 
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 ${isAdded ? 'ring-2 ring-green-500' : ''}`}
                >
                  <div className="relative">
                    <img 
                      src={formation.image} 
                      alt={formation.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-course.jpg";
                      }}
                    />
                    {isAdded && (
                      <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ✓ Ajoutée
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {formation.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-700 dark:text-gray-300">{formation.rating}</span>
                        <span className="mx-2">•</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{formation.students} étudiants</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                      {formation.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {formation.description}
                    </p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Formateur:</span> {formation.instructor}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Durée:</span> {formation.duration}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {formation.price}
                        </span>
                      </div>
                    </div>
                    
                    {isAdded ? (
                      <button
                        onClick={() => removeFormation(formation.id)}
                        className="w-full py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Retirer de ma liste
                      </button>
                    ) : isMaxReached ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                      >
                        Maximum 5 formations atteint
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(formation)}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                        Ajouter à ma liste
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
        
        </div>
      </div>
      
      <div
        className="relative bg-fixed bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/bgg.jpg')" }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-10 max-w-9xl mx-auto">
          <img
            src="/images/ww8.png"
            alt="CCCT Banner"
            className="w-80 h-80 object-cover rounded-lg shadow-md md:w-90 md:h-90"
          />
          <div className="flex flex-col text-gray-100">
            <h1 className="text-2xl font-bold md:text-4xl">Contexte et Objectifs</h1>
            <p
              className="text-gray-100"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', 
              }}
            >
              La Chambre de Commerce Canado-Tunisienne (CCCT) est une organisation qui vise à renforcer les relations économiques, commerciales et culturelles entre le Canada et la Tunisie. Pour soutenir ses activités et améliorer l'expérience de ses membres, la CCCT souhaite développer un site web professionnel et fonctionnel. Ce site doit centraliser la gestion des membres, permettre les paiements en ligne sécurisés, et simplifier les processus d'adhésion et de renouvellement.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-100 dark:bg-gray-900 text-red-600 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm">Membres Actifs</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">20+</div>
            <div className="text-sm">Posts</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">40+</div>
            <div className="text-sm">Events</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm">Comments</div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 w-[115%] text-gray-800 dark:text-white">Latest Posts</h1>
          <p className="text-gray-600 dark:text-gray-300 w-[115%]">
            Abonnez-vous pour voir les détails clairement
          </p>
        </div>
        <div className="flex justify-end pr-16">
          <div className="w-[75%] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{post.title}</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>
                      <i className="fa fa-user text-primary mr-1"></i>
                      {post.author}
                    </span>
                    <span>
                      <i className="fa fa-calendar text-primary mr-1"></i>
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Gallery</h2>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {[
            "/images/e1.jpg",
            "/images/mon3.jpg",
            "/images/s1.jpg",
            "/images/e4.jpg",
            "/images/mon2.jpg",
            "/images/s2.jpg",
          ].map((src, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-700 break-inside-avoid transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Photos de nos événements récents</h3>          
                <p className="text-sm text-gray-500 dark:text-gray-400">Abonnez-vous pour voir les détails clairement</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-20 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: 'url("/images/bgg.jpg")' }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0 animate-pulse dark:bg-gray-800/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Nos Partenaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
            
            <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="https://example.com/partner1" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/aa1.jpg"
                  alt="Partner 1"
                  className="w-32 h-32 mx-auto object-contain opacity-75 hover:opacity-100 transition-opacity mb-4 transform hover:scale-110 transition-transform duration-300"
                />
              </a>
              <h3 className="text-xl font-semibold mb-2">Aeros Innovation Center</h3>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="https://pm.gov.tn/ar?lang=en" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/aa2.png"
                  alt="Partner 2"
                  className="w-32 h-32 mx-auto object-contain opacity-75 hover:opacity-100 transition-opacity mb-4 transform hover:scale-110 transition-transform duration-300"
                />
              </a>
              <h3 className="text-xl font-semibold mb-2"> Gouvernement – Tunisie</h3>
              
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="https://www.canada.ca/fr.html" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/aa3.png"
                  alt="Partner 3"
                  className="w-32 h-32 mx-auto object-contain opacity-75 hover:opacity-100 transition-opacity mb-4 transform hover:scale-110 transition-transform duration-300"
                />
              </a>
              <h3 className="text-xl font-semibold mb-2">Gouvernement – Canada</h3>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="https://www.facebook.com/mohamedrayen05/" target="_blank" rel="noopener noreferrer">
                <img
                  src=""
                  alt="Partner 4"
                  className="w-32 h-32 mx-auto object-contain opacity-75 hover:opacity-100 transition-opacity mb-4 transform hover:scale-110 transition-transform duration-300"
                />
              </a>
              <h3 className="text-xl font-semibold mb-2">Développeur de ce site</h3>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 py-10">
        <h2 className="text-4xl font-extrabold text-center mb-8">Testimonials</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto overflow-hidden rounded-full transition-transform duration-500 hover:scale-150">
              <img
                src="/images/pp2.webp"
                alt="User 1"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">"La CCCT m'a aidé à développer mes relations d'affaires."</p>
            <p className="text-gray-900 dark:text-white mt-2 font-semibold">User- Adem Talbi</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto overflow-hidden rounded-full transition-transform duration-500 hover:scale-150">
              <img
                src="/images/pp5.jpg"
                alt="User 2"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">"Le site est tellement facile à utiliser."</p>
            <p className="text-gray-900 dark:text-white mt-2 font-semibold">User- Toujani Mohamed Rayen</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto overflow-hidden rounded-full transition-transform duration-500 hover:scale-150">
              <img
                src="/images/pp.webp"
                alt="User 3"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">"Un service impeccable et professionnel."</p>
            <p className="text-gray-900 dark:text-white mt-2 font-semibold">User- Noussayer Rahal</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto p-10">
        <h2 className="text-4xl font-extrabold text-center text-red-600">FAQ</h2>
        <div className="mt-6 space-y-6">
          <div className="bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-600">
            <h3 className="text-2xl font-semibold text-red-700">Comment puis-je adhérer à la CCCT ?</h3>
            <p className="text-gray-700 mt-2">
              Vous pouvez adhérer en remplissant le formulaire d'inscription en ligne et en effectuant le paiement de votre cotisation.
            </p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-600">
            <h3 className="text-2xl font-semibold text-red-700">Quels sont les avantages d'être membre ?</h3>
            <p className="text-gray-700 mt-2">
              Les membres bénéficient d'un accès exclusif à nos événements, formations, et opportunités de réseautage.
            </p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-600 flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-red-700">Comment puis-je contacter la CCCT ?</h3>
            <p className="text-gray-700 mt-2">
              Vous pouvez nous contacter via notre page de contact ou en envoyant un email à notre service clientèle.
            </p>
            <button 
              className="mt-4 px-5 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              onClick={() => setShowContactForm(true)}
            >
              Remplir le formulaire de contact
            </button>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="relative bg-fixed bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/bgg.jpg')" }}>
        <div className="bg-black bg-opacity-60 py-16">
          <div className="max-w-4xl mx-auto text-center text-gray-100">
            <h2 className="text-4xl font-bold mb-4">Prêt à rejoindre la CCCT ?</h2>
            <p className="mb-6">Inscrivez-vous dès maintenant et profitez de tous nos services.</p>
            <Link to="/sign-up" className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
              S'inscrire maintenant
            </Link>
          </div>
        </div>
      </div>
      
      {/* Form Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border-t-4 border-red-600">
            <h2 className="text-3xl font-bold text-red-700 mb-6">Formulaire de Contact</h2>
            <form>
              <div className="mb-5">
                <label className="block text-gray-800 font-semibold">Nom</label>
                <input 
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
                  placeholder="Votre nom" 
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-800 font-semibold">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
                  placeholder="Votre email" 
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-800 font-semibold">Message</label>
                <textarea 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
                  placeholder="Votre message"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setShowContactForm(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mes Formations Modal */}
      {showMyFormations && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Mes Formations ({myFormations.length}/5)
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Vos formations sont sauvegardées localement dans votre navigateur
                  </p>
                </div>
                <button
                  onClick={() => setShowMyFormations(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {myFormations.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" opacity="0.5" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">Aucune formation sélectionnée</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Ajoutez des formations depuis la liste pour les voir ici
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex justify-end">
                    <button
                      onClick={clearAllFormations}
                      className="px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Vider toutes les formations
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myFormations.map((formation) => (
                      <div key={formation.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow">
                        <div className="flex">
                          <img 
                            src={formation.image} 
                            alt={formation.title}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/default-course.jpg";
                            }}
                          />
                          <div className="ml-4 flex-1">
                            <h3 className="font-bold text-gray-800 dark:text-white">{formation.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{formation.description.substring(0, 80)}...</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="font-bold text-red-600 dark:text-red-400">{formation.price}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Ajouté le: {formation.addedDate || "Aujourd'hui"}
                                </span>
                                <button
                                  onClick={() => removeFormation(formation.id)}
                                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                  title="Supprimer"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-blue-800 dark:text-blue-300">Information</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Vous avez sélectionné {myFormations.length} formation(s) sur 5 maximum. Vos choix sont sauvegardés automatiquement.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowMyFormations(false)}
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Success Message */}
      {showPurchaseSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPurchaseSuccess(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md mx-4 animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Formation Ajoutée !
              </h3>
              
              {selectedFormation && (
                <>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Vous avez ajouté: <span className="font-semibold text-red-600 dark:text-red-400">{selectedFormation.title}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Formations dans votre liste: <span className="font-bold">{myFormations.length}/5</span>
                  </p>
                </>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <button
                  onClick={() => setShowPurchaseSuccess(false)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Continuer
                </button>
                <button
                  onClick={() => {
                    setShowPurchaseSuccess(false);
                    setShowMyFormations(true);
                  }}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Voir mes formations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}