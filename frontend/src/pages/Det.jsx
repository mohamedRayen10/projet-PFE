import React, { useState } from "react";

const SendMailPage = () => {
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [alert, setAlert] = useState("");

  const addEmail = () => {
    if (emailInput && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const sendMail = (e) => {
    e.preventDefault();

    if (emails.length === 0 || !message) {
      setAlert("❗Veuillez ajouter des destinataires et un message.");
      return;
    }

    setTimeout(() => {
      setAlert("📨 Le message est envoyé avec succès !");
      setEmails([]);
      setMessage("");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-xl border border-red-300">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        📧 Envoyer un Email+
      </h2>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Entrer une adresse email"
          className="flex-1 p-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={addEmail}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
        >
          Ajouter
        </button>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-red-700 mb-2">Destinataires :</p>
        <ul className="list-disc pl-5 space-y-1">
          {emails.map((email, index) => (
            <li key={index} className="flex items-center justify-between bg-red-50 p-2 rounded-lg">
              <span className="text-sm text-gray-800">{email}</span>
              <button
                onClick={() => removeEmail(email)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre message ici..."
        className="w-full p-4 border border-red-300 rounded-xl h-36 focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
      ></textarea>

      <button
        onClick={sendMail}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-lg transition"
      >
        ✉️ Envoyer
      </button>

      {alert && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl text-center">
          {alert}
        </div>
      )}
    </div>
  );
};

export default SendMailPage;
