const { getStudentList } = require("../queries/student/studentListQuery");

/**
 * Service: Get Student Listing
 *
 * Calls the query builder and returns the result.
 *
 * @param {Object} queryParams
 * @returns {Object}
 */
async function getStudents(queryParams) {

    const result = await getStudentList(queryParams);

    return result;

}

module.exports = {
    getStudents,
};