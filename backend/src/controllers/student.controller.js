const studentService = require("../services/student.service");

/**
 * GET /students
 */
async function getStudents(req, res, next) {

    try {

        const filters = req.query;

        const result = await studentService.getStudents(filters);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

}

module.exports = {
    getStudents
};