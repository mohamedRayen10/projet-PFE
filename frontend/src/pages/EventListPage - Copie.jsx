// src/EventListPage.jsx
import { useNavigate } from 'react-router-dom'

export default function EventListPage({ events, onDelete, onEdit }) {
  const navigate = useNavigate()

  const handleEditAndNavigate = idx => {
    onEdit(idx)
    navigate('/form')
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Calendrier des Événements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-lg text-center">
                  <span className="text-red-600 font-bold text-xl">{event.date}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-500">{event.time}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{event.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEditAndNavigate(index)} className="text-blue-600 hover:underline">Modifier</button>
                <button onClick={() => onDelete(index)} className="text-red-600 hover:underline">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
