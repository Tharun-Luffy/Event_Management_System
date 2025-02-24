import React, { useEffect, useState } from "react";
import axios from "../services/api";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  // Fetch user's events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/api/events/user/${userId}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Create a new event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("/api/events/add", {
        ...newEvent,
        user_id: userId,
      });
      alert("Event created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      alert("Event deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h2>Manage Your Events</h2>

      {/* Create Event Form */}
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
          required
        />
        <button type="submit">Create Event</button>
      </form>

      <h3>Your Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h4>{event.name}</h4>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
