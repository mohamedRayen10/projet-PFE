import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@fullcalendar/core";

// Catégories de couleurs
const categoryColors = {
  Général: "bg-gray-300 text-gray-800",
  Réunion: "bg-blue-300 text-blue-800",
  Tâche: "bg-yellow-300 text-yellow-800",
  Personnel: "bg-green-300 text-green-800",
};

function renderEventContent(eventInfo) {
  const category = eventInfo.event.extendedProps.category || "Général";
  const categoryStyle = categoryColors[category] || categoryColors["Général"];

  return (
    <div className="flex flex-col">
      <b className="text-blue-600">{eventInfo.timeText}</b>
      <span className="font-medium">{eventInfo.event.title}</span>
      <span
        className={`text-xs mt-1 px-2 py-0.5 rounded-full w-fit ${categoryStyle}`}
      >
        {category}
      </span>
    </div>
  );
}

function renderSidebarEvent(event) {
  const category = event.extendedProps?.category || "Général";
  const categoryStyle = categoryColors[category] || categoryColors["Général"];

  return (
    <li
      key={event.id}
      className="bg-white shadow-sm rounded-lg p-3 mb-3 border hover:shadow-md transition-all"
    >
      <div className="text-gray-500 text-xs">
        {formatDate(new Date(event.start), {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="text-gray-800 font-semibold">{event.title}</div>
      <div
        className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${categoryStyle}`}
      >
        {category}
      </div>
    </li>
  );
}

const Calendar = () => {
  const isAdmin = true;
  const [weekendsVisible, setweekendsVisible] = useState(true);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Général");

  const savedEvents = localStorage.getItem("savedEvents");
  const initialEvents = savedEvents ? JSON.parse(savedEvents) : [];

  let eventGuid = 0;
  function createEventId() {
    return String(eventGuid++);
  }

  const handleWeekendsToggle = () => {
    setweekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    if (!isAdmin) {
      alert("Only admin can add events.");
      return;
    }
    setSelectedInfo(selectInfo);
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    if (!isAdmin) {
      alert("Only admin can remove events.");
      return;
    }
    if (
      window.confirm(`Are you sure you want to delete '${clickInfo.event.title}'?`)
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setcurrentEvents(events);
    const plainEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start ? event.start.toISOString() : null,
      end: event.end ? event.end.toISOString() : null,
      allDay: event.allDay,
      category: event.extendedProps.category || "Général",
    }));
    localStorage.setItem("savedEvents", JSON.stringify(plainEvents));
  };

  const handleModalSubmit = () => {
    if (!newTitle.trim() || !selectedInfo) return;
    const calendarApi = selectedInfo.view.calendar;
    calendarApi.unselect();

    calendarApi.addEvent({
      id: createEventId(),
      title: newTitle,
      start: selectedInfo.startStr,
      end: selectedInfo.endStr,
      allDay: selectedInfo.allDay,
      category: newCategory,
    });

    setNewTitle("");
    setNewCategory("Général");
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50 text-sm">
      {/* Sidebar */}
      <div className="w-[300px] border-r border-gray-200 p-6 bg-white">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
          📅 Tous les événements ({currentEvents.length})
        </h2>

        <button
          onClick={handleWeekendsToggle}
          className="mb-6 w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded transition"
        >
          {weekendsVisible ? "Masquer les week-ends" : "Afficher les week-ends"}
        </button>

        <ul className="overflow-auto max-h-[80vh]">
          {currentEvents.map(renderSidebarEvent)}
        </ul>
      </div>

      {/* Calendar */}
      <div className="flex-grow p-8 max-w-[1100px] mx-auto bg-white rounded shadow-md mt-8">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialEvents={initialEvents}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Créer un événement</h2>
            <input
              type="text"
              placeholder="Titre"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option>Général</option>
              <option>Réunion</option>
              <option>Tâche</option>
              <option>Event</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
