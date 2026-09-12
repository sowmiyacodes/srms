const knex = require("../config/db");
const staffService = require("../services/staff.service");
const projectStudentsService = require("../services/projectStudents.service");

async function getFacultyList(req, res, next) {
  try {
    const faculty = await knex("staff")
      .select(
        "staffid",
        "staffname"
      )
      .orderBy("staffname");

    res.json(faculty);
  } catch (err) {
    next(err);
  }
}

async function getStaffList(req, res, next) {
  try {
    const result = await staffService.getStaffList(req.query);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getStaffDetails(req, res, next) {
  try {
    const { id } = req.params;

    const staff = await staffService.getStaffDetails(id);

    res.json({
      success: true,
      data: staff,
    });
  } catch (err) {
    next(err);
  }
}

async function getFAList(req, res, next) {
  try {
    const data = await staffService.getFAList();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function getGuestFacultyList(req, res, next) {
  try {
    const data = await staffService.getGuestFacultyList();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function getProjectStudents(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Staff ID is required",
      });
    }

    const students =
      await projectStudentsService.getProjectStudentsByStaff(id);

    res.json({
      success: true,
      data: students,
    });
  } catch (err) {
    next(err);
  }
}

async function getFAStudents(req, res, next) {

    try {

        const { faId } = req.params;

        const {
            yearNumber,
            branchId
        } = req.query;

        if (!faId) {

            return res.status(400).json({
                success: false,
                message: "faId is required"
            });

        }

        if (!yearNumber) {

            return res.status(400).json({
                success: false,
                message: "yearNumber is required"
            });

        }

        if (!branchId) {

            return res.status(400).json({
                success: false,
                message: "branchId is required"
            });

        }

        const students = await staffService.getFAStudents(
            faId,
            yearNumber,
            branchId
        );

        return res.status(200).json({
            success: true,
            data: students,
            count: students.length
        });

    } catch (error) {

        next(error);

    }
}

module.exports = {
  getFacultyList,
  getStaffList,
  getStaffDetails,
  getFAList,
  getGuestFacultyList,
  getProjectStudents,
  getFAStudents,
};