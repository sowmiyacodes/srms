const { createBaseQuery } = require("../../filters/student/baseQuery");
const { applyBasicFilters } = require("../../filters/student/basicFilters");
const { applySearchFilter } = require("../../filters/student/searchFilters");
const { applyRangeFilters } = require("../../filters/student/rangeFilters");
const { applyExistsFilters } = require("../../filters/student/existsFilters");
const { applySorting } = require("../../filters/student/sorting");
const { applyPagination } = require("../../filters/student/pagination");
const { buildCountQuery } = require("../../filters/student/countQuery");

/**
 * Builds and executes Student Listing Query
 */

async function getStudentList(filters) {

    // -------------------------
    // Base Query
    // -------------------------

    const query = createBaseQuery();

    // -------------------------
    // Apply Filters
    // -------------------------

    applyBasicFilters(query, filters);

    applySearchFilter(query, filters);

    applyRangeFilters(query, filters);

    applyExistsFilters(query, filters);

    // -------------------------
    // Build Count Query
    // -------------------------

    const countQuery = buildCountQuery(query);

    // -------------------------
    // Apply Sorting
    // -------------------------

    applySorting(query, filters);

    // -------------------------
    // Apply Pagination
    // -------------------------

    applyPagination(query, filters);

    // -------------------------
    // Execute Queries
    // -------------------------

    const [students, countResult] = await Promise.all([
        query,
        countQuery
    ]);

    return {

        data: students,

        totalRecords: Number(countResult[0].totalRecords)

    };

}

module.exports = {
    getStudentList
};