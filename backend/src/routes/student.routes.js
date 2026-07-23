const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");

const studentController = require("../controllers/student.controller");

router.get(
    "/",
    authenticate,
    studentController.getStudents
);

module.exports = router;