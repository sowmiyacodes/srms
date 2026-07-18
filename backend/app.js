const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/student.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);

// Student Routes
app.use("/api/students", studentRoutes);

module.exports = app;