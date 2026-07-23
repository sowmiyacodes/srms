const { getStudentList } = require("../queries/student/studentListQuery");

/**
 * Service: Get Student Listing
 *
 * @param {Object} queryParams
 * @param {Object} user
 * @returns {Object}
 */
async function getStudents(queryParams, user) {

    const result = await getStudentList(

        queryParams,

        user

    );

    return result;

}

module.exports = {
    getStudents,
};