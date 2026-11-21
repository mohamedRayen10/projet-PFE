// src/EventFormPage.jsx
import { Link } from 'react-router-dom'

export default function EventFormPage({
  editingIndex,
  newEvent,
  setNewEvent,
  onAdd,
  onUpdate,
  onCancel
}) {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">
            {editingIndex !== null ? "Modifier l'Événement" : "Ajouter un Événement"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Date (ex: 30 Avril)"
              value={newEvent.date}
              onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Heure (ex: 10:00 - 12:00)"
              value={newEvent.time}
              onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Titre"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              className="border p-2 rounded"
            />
          </div>

          {editingIndex !== null ? (
            <button onClick={onUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2">
              Enregistrer les modifications
            </button>
          ) : (
            <button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2">
              Ajouter un événement
            </button>
          )}

          <div>
            <button
              onClick={onCancel}
              className="text-gray-600 hover:underline mr-4"
            >
              Annuler
            </button>
            <Link to="/" className="text-blue-600 hover:underline">Retour au calendrier</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
