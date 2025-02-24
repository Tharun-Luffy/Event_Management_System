require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
