const express = require("express");

const router = express.Router();

const staffController = require("../controllers/staff.controller");

router.get(
    "/faculty",
    staffController.getFacultyList
);

module.exports = router;