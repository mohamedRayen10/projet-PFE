import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle, HiCheckCircle, HiXCircle } from "react-icons/hi";

const DashProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const filePickerRef = useRef();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const dispatch = useDispatch();

  // Générateur d'historique aléatoire
  const generateRandomHistory = () => {
    const methods = ["Carte de crédit", "PayPal", "Virement bancaire", "Chèque"];
    const statuses = ["paid", "failed"];
    const historyLength = Math.floor(Math.random() * 5) + 3; // 3 à 7 paiements

    const history = [];
    for (let i = 0; i < historyLength; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 365);
      const date = new Date();
      date.setDate(date.getDate() - randomDaysAgo);

      history.push({
        id: i + 1,
        date: date.toISOString(),
        method: methods[Math.floor(Math.random() * methods.length)],
        amount: 18, // montant fixe 18$
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }
    return history.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      setPaymentHistory(generateRandomHistory());
    } else {
      setPaymentHistory([]);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Impossible de télécharger l'image (taille max 2MB)");
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploadProgress(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("Aucune modification détectée");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Veuillez patienter pendant le téléchargement de l'image");
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profil mis à jour avec succès");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/backend/user/signout`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Profil
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Colonne gauche : photo + actions */}
        <div className="flex flex-col items-center space-y-6">
          <div
            className="relative w-48 h-48 cursor-pointer rounded-full border-4 border-blue-500 overflow-hidden hover:scale-110 transition-transform duration-300"
            onClick={() => filePickerRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="Photo de profil"
              className="object-cover w-full h-full"
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure" className="w-full">
              {imageFileUploadError}
            </Alert>
          )}

          <div className="flex flex-col space-y-3 w-full">
            <Button
              type="submit"
              disabled={loading || imageFileUploading}
              onClick={handleSubmit}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              {loading ? "Chargement..." : "Mettre à jour le profil"}
            </Button>

            <Link to="/create-post" className="w-full">
              <Button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-700 text-white font-semibold rounded-lg transition-colors duration-300">
                Créer une publication
              </Button>
            </Link>

            {/* Bouton voir historique visible uniquement pour membre non-admin */}
            {!currentUser.isAdmin && (
              <Button
                color="blue"
                onClick={() => setShowPaymentHistory(!showPaymentHistory)}
                className="w-full py-3 mt-3 font-semibold rounded-lg transition-colors duration-300"
              >
                {showPaymentHistory ? "Masquer l'historique des paiements" : "Voir l'historique des paiements"}
              </Button>
            )}
          </div>
        </div>

        {/* Colonne droite : formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <TextInput
              type="text"
              id="username"
              placeholder="Nom d'utilisateur"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-500 rounded-lg"
            />
            <TextInput
              type="text"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-500 rounded-lg"
            />
            <TextInput
              type="text"
              id="tele"
              placeholder="Numéro de téléphone"
              defaultValue={currentUser.tele || ""}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-500 rounded-lg"
            />
            <TextInput
              type="password"
              id="password"
              placeholder="Changer le mot de passe"
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-500 rounded-lg"
            />
          </div>

          {updateUserSuccess && (
            <Alert color="success" className="mt-4">
              {updateUserSuccess}
            </Alert>
          )}
          {updateUserError && (
            <Alert color="failure" className="mt-4">
              {updateUserError}
            </Alert>
          )}
        </form>
      </div>

      {/* Section historique paiements */}
      {showPaymentHistory && !currentUser.isAdmin && (
        <section className="mt-10 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-200">
            Historique des paiements
          </h2>

          {!paymentHistory.length ? (
            <p className="text-gray-700 dark:text-gray-400">Aucun paiement trouvé.</p>
          ) : (
            <ul className="space-y-4">
              {paymentHistory.map((payment) => (
                <li
                  key={payment.id}
                  className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 flex-1 mb-2 md:mb-0">
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Date :{" "}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Date(payment.date).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Montant :{" "}
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        ${payment.amount}.00
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Méthode :{" "}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">{payment.method}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {payment.status === "paid" ? (
                      <HiCheckCircle className="text-green-600" size={24} title="Payé" />
                    ) : (
                      <HiXCircle className="text-red-600" size={24} title="Échoué" />
                    )}
                    <span
                      className={`font-semibold ${
                        payment.status === "paid" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {payment.status === "paid" ? "Payé" : "Échoué"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Modal suppression compte */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Confirmer la suppression</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center space-y-4">
            <HiOutlineExclamationCircle size={48} className="text-red-600" />
            <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteUser}>
            Supprimer mon compte
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashProfile;
