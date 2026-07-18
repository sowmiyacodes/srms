const studentService = require("../services/student.service");

/**
 * GET /students
 *
 * Student Listing Screen
 */
async function getStudents(req, res, next) {

    try {

        const result = await studentService.getStudents(req.query);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

}

module.exports = {
    getStudents,
};