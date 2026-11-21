import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebook, FaGithub } from 'react-icons/fa';  // Icônes Facebook et GitHub
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fonction pour se connecter avec Google
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch("/backend/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });
            
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");   
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Fonction pour se connecter avec Facebook
    const handleFacebookClick = () => {
        console.log('Facebook login triggered');
        // Implémenter ici la logique de connexion Facebook si nécessaire
    };

    // Fonction pour se connecter avec GitHub
    const handleGithubClick = () => {
        console.log('GitHub login triggered');
        // Implémenter ici la logique de connexion GitHub si nécessaire
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Bouton Google */}
            <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
                <AiFillGoogleCircle className="w-6 h-6 mr-2" />
                Continuer avec Google
            </Button>

            {/* Bouton Facebook */}
            <button
                onClick={handleFacebookClick}
                className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
                <FaFacebook className="mr-3 w-6 h-6" />
                Continuer avec Facebook
            </button>

            {/* Bouton GitHub */}
            <button
                onClick={handleGithubClick}
                className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition"
            >
                <FaGithub className="mr-3 w-6 h-6" />
                Continuer avec GitHub
            </button>
        </div>
    );
};

export default OAuth;
