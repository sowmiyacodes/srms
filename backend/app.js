const express = require("express");
const cors=require("cors");

const authRoutes = require("./src/routes/authRoutes");

const studentRoutes = require("./src/routes/student.routes");
const staffRoutes = require("./src/routes/staff.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/v1/students", studentRoutes);
app.use("/api/staff", staffRoutes);
module.exports = app;