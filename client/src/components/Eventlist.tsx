import React, { useEffect, useState } from "react";
import { getEvents, registerForEvent } from "../services/eventApi";
import { Event } from "../types/Event";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId: number) => {
    try {
      await registerForEvent(eventId);
      alert("Successfully registered for the event!");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <button onClick={() => handleRegister(event.id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
