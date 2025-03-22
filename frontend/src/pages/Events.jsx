import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const events = [
    { 
      id: 1, 
      title: "Event 1", 
      description: "A brief overview of Event 1", 
      time: "10:00 AM, May 12, 2025", 
      address: "123 Event St, City, Country", 
      payment: "Free", 
      image: "https://via.placeholder.com/300x200?text=Event+1+Image",
      status: "open" // Status added
    },
    { 
      id: 2, 
      title: "Event 2", 
      description: "A description of Event 2", 
      time: "2:00 PM, May 15, 2025", 
      address: "456 Event Ave, City, Country", 
      payment: "$50", 
      image: "https://via.placeholder.com/300x200?text=Event+2+Image",
      status: "closed" // Status added
    },
    { 
      id: 3, 
      title: "Event 3", 
      description: "Details of Event 3", 
      time: "9:00 AM, May 20, 2025", 
      address: "789 Event Blvd, City, Country", 
      payment: "Free", 
      image: "https://via.placeholder.com/300x200?text=Event+3+Image",
      status: "closed" // Status added
    },
    { 
      id: 4, 
      title: "Event 4", 
      description: "Event 4 highlights", 
      time: "1:00 PM, May 25, 2025", 
      address: "101 Event Rd, City, Country", 
      payment: "$30", 
      image: "https://via.placeholder.com/300x200?text=Event+4+Image",
      status: "closed" // Status added
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-red-500 mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-t-lg mb-4"/>
            <h3 className="text-xl font-semibold text-red-500">{event.title}</h3>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p className="text-gray-600">Time: {event.time}</p>
            <p className="text-gray-600">Location: {event.address}</p>
            <p className="text-gray-600">Payment: {event.payment}</p>
            {event.status === "open" ? (
              <Link to={`/Det/`} className="text-blue-500 mt-2 block">Learn More</Link>
            ) : (
              <p className="text-gray-500 mt-2">Event Closed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
