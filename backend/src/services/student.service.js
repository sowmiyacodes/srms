const createStudentListQuery = require("../queries/student/baseQuery");
const applyStudentFilters = require("../queries/student/filters");
const applySorting = require("../queries/student/sorting");
const applyPagination = require("../queries/student/pagination");

async function getStudents(filters) {

    const query = createStudentListQuery();

    applyStudentFilters(query, filters);

    applySorting(
        query,
        filters.sortBy,
        filters.order
    );

    applyPagination(
        query,
        filters.page,
        filters.limit
    );

    return await query;
}

module.exports = {
    getStudents
};