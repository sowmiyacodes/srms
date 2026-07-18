const { getStudentList } = require("../queries/student/studentListQuery");

/**
 * Service for Student Listing
 */
async function getStudents(filters) {

    const result = await getStudentList(filters);

    return result;
}

module.exports = {
    getStudents
};