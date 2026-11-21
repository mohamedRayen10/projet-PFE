import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const defaultEvents = [
    {
      id: 1,
      title: "l’événement Dardacha",
      description:
        "Notre présidente Souad Siala a assisté à l’événement Dardacha organisé par National Council on Canada-Arab Relations le samedi 18 mai 2024. Un échange riche d’idées dans une ambiance conviviale.",
      time: "10:00 AM, May 31, 2025",
      address: "123 tvsk, Montreal, Canada",
      payment: "Free",
      image: "/images/e4.jpg",
      status: "open",
    },
    {
      id: 2,
      title: "Événement 2",
      description: "A description of Event 2",
      time: "2:00 PM, May 15, 2025",
      address: "456 Event Ave, City, Country",
      payment: "$50",
      image: "/images/e3.jpg",
      status: "closed",
    },
  ];

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    time: "",
    address: "",
    payment: "",
    image: "",
    status: "open",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  // Check role
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  // Load events from localStorage or use default
  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      setEvents(JSON.parse(stored));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem("events", JSON.stringify(defaultEvents));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const id = Date.now();
    setEvents([...events, { ...newEvent, id }]);
    setNewEvent({
      title: "",
      description: "",
      time: "",
      address: "",
      payment: "",
      image: "",
      status: "open",
    });
  };

  const handleRemove = (id) => {
    if (window.confirm("Supprimer cet événement ?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-red-500 mb-8">Événements à venir</h2>

      {/* Admin form */}
      {isAdmin && (
        <form onSubmit={handleAdd} className="mb-10 space-y-3 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-bold">Créer un nouvel événement (Admin)</h3>
          <input
            name="title"
            placeholder="Titre"
            value={newEvent.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="time"
            placeholder="Heure et date"
            value={newEvent.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Adresse"
            value={newEvent.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="payment"
            placeholder="Paiement"
            value={newEvent.payment}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          <select
            name="status"
            value={newEvent.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="open">Ouvert</option>
            <option value="closed">Fermé</option>
          </select>
          <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">
            Ajouter
          </button>
        </form>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow rounded p-4 relative">
            <img
              src={event.image || "/images/default.jpg"}
              alt={event.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-red-500">{event.title}</h3>
            <p className="text-sm mb-2">{event.description.substring(0, 100)}...</p>
            <p className="text-sm">⏰ {event.time}</p>
            <p className="text-sm">📍 {event.address}</p>
            <p className="text-sm">💳 {event.payment}</p>
            {event.status === "open" ? (
              <button
                onClick={() => setModalEvent(event)}
                className="text-blue-500 mt-2 underline"
              >
                Learn More
              </button>
            ) : (
              <p className="text-gray-500 mt-2">Fermé</p>
            )}
            {isAdmin && (
              <button
                onClick={() => handleRemove(event.id)}
                className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded"
              >
                Supprimer
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
            <button
              onClick={() => setModalEvent(null)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✖
            </button>
            <img
              src={modalEvent.image}
              alt={modalEvent.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold text-red-500">{modalEvent.title}</h3>
            <p className="mb-2">{modalEvent.description}</p>
            <p>🕒 {modalEvent.time}</p>
            <p>📍 {modalEvent.address}</p>
            <p>💳 {modalEvent.payment}</p>
            <p className="mt-2 font-semibold">
              Statut:{" "}
              <span className={modalEvent.status === "open" ? "text-green-600" : "text-gray-500"}>
                {modalEvent.status === "open" ? "Ouvert" : "Fermé"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
