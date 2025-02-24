const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Add Event
router.post("/add", async (req, res) => {
  const { name, description, date, location, user_id } = req.body;
  try {
    await db.query(
      "INSERT INTO events (name, description, date, location, user_id) VALUES (?, ?, ?, ?, ?)",
      [name, description, date, location, user_id]
    );
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get Events by User
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const [events] = await db.query("SELECT * FROM events WHERE user_id = ?", [
      user_id,
    ]);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Delete Event
router.delete("/:event_id", async (req, res) => {
  const { event_id } = req.params;
  try {
    await db.query("DELETE FROM events WHERE id = ?", [event_id]);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
