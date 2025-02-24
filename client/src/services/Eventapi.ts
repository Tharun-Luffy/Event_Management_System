import api from "./api";

// Get all events
export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

// Register for an event
export const registerForEvent = async (eventId: number) => {
  const response = await api.post(`/events/${eventId}/register`);
  return response.data;
};
