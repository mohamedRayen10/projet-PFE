const defaultEvents = [
  {
    date: "17 Mars",
    time: "10:00 - 12:00",
    title: "Événement 1",
    description: "Description de l'événement important organisé par la CCCT",
  },
  {
    date: "22 Mars",
    time: "14:00 - 16:00",
    title: "Événement 2",
    description: "Un autre événement spécial pour les membres",
  },
  {
    date: "28 Mars",
    time: "09:00 - 11:00",
    title: "Événement 3",
    description: "Séminaire sur les opportunités d'affaires",
  },
];

const getLocalEvents = () => {
  const stored = localStorage.getItem("ccct_events");
  return stored ? JSON.parse(stored) : defaultEvents;
};

const [events, setEvents] = useState(getLocalEvents());
const [editingIndex, setEditingIndex] = useState(null);
const [newEvent, setNewEvent] = useState({
  date: "",
  time: "",
  title: "",
  description: "",
});

useEffect(() => {
  localStorage.setItem("ccct_events", JSON.stringify(events));
}, [events]);

const handleAddEvent = () => {
  if (newEvent.date && newEvent.title) {
    setEvents([...events, newEvent]);
    setNewEvent({ date: "", time: "", title: "", description: "" });
  }
};

const handleDelete = (index) => {
  const updated = events.filter((_, i) => i !== index);
  setEvents(updated);
};

const handleEdit = (index) => {
  setEditingIndex(index);
  setNewEvent(events[index]);
};

const handleUpdate = () => {
  const updated = [...events];
  updated[editingIndex] = newEvent;
  setEvents(updated);
  setEditingIndex(null);
  setNewEvent({ date: "", time: "", title: "", description: "" });
};




{/* Event Calendar Section */}
          
<div className="py-20 bg-gray-50">
<div className="max-w-7xl mx-auto px-4">
  <h2 className="text-4xl font-bold text-center mb-12">Calendrier des Événements</h2>

  {/* Event Cards */}
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
          <button
            onClick={() => handleEdit(index)}
            className="text-blue-600 hover:underline"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDelete(index)}
            className="text-red-600 hover:underline"
          >
            Supprimer
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Event Form */}
  <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
    <h3 className="text-2xl font-semibold mb-4">
      {editingIndex !== null ? "Modifier l'Événement" : "Ajouter un Événement"}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input
        type="text"
        placeholder="Date (ex: 30 Avril)"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Heure (ex: 10:00 - 12:00)"
        value={newEvent.time}
        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Titre"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        className="border p-2 rounded"
      />
    </div>
    {editingIndex !== null ? (
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer les modifications
      </button>
    ) : (
      <button
        onClick={handleAddEvent}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ajouter un événement
      </button>
    )}
  </div>
</div>
</div>