const express = require("express");

const router = express.Router();

const staffController = require("../controllers/staff.controller");

router.get(
    "/faculty",
    staffController.getFacultyList
);

router.get(
    "/",
    staffController.getStaffList
);

router.get(
    "/:id",
    staffController.getStaffDetails
);

module.exports = router;