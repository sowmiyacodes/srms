const express = require("express");

const router = express.Router();

const staffController = require("../controllers/staff.controller");

router.get(
  "/faculty",
  staffController.getFacultyList
);

router.get(
  "/fa",
  staffController.getFAList
);


router.get(
    "/fa/:faId/students",
    staffController.getFAStudents
);

router.get(
  "/",
  staffController.getStaffList
);

router.get(
  "/:id/project-students",
  staffController.getProjectStudents
);

router.get(
  "/:id",
  staffController.getStaffDetails
);

console.log("Staff routes loaded");

module.exports = router;