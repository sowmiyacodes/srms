const { createBaseQuery } = require("../../filters/student/baseQuery");

const { applyBasicFilters } = require("../../filters/student/basicFilters");

const { applySearchFilter } = require("../../filters/student/searchFilters");

const { applyRangeFilters } = require("../../filters/student/rangeFilters");

const { applyExistsFilters } = require("../../filters/student/existsFilters");

const { applySorting } = require("../../filters/student/sorting");

const { applyPagination } = require("../../filters/student/pagination");

const { buildCountQuery } = require("../../filters/student/countQuery");
const { applyRoleFilter } = require("../../filters/student/roleFilter");
/**
 * Builds and executes the Student Listing query.
 *
 * Returns
 * -------
 * {
 *   data: [],
 *   meta: {}
 * }
 */

async function getStudentList(params,user) {

    //------------------------------------------------
    // Create Base Query
    //------------------------------------------------

    const query = createBaseQuery();

    //------------------------------------------------
    // Apply Filters
    //------------------------------------------------

    applyBasicFilters(query, params);

    applySearchFilter(query, params);

    applyRangeFilters(query, params);

    applyExistsFilters(query, params);
    applyRoleFilter(query, user);

    //------------------------------------------------
    // Count Query
    //------------------------------------------------

    const countQuery = buildCountQuery(query);

    //------------------------------------------------
    // Sorting
    //------------------------------------------------

    applySorting(query, params);

    //------------------------------------------------
    // Pagination
    //------------------------------------------------

    const pagination = applyPagination(query, params);

    //------------------------------------------------
    // Execute Queries
    //------------------------------------------------

    const [students, totalResult] = await Promise.all([

        query,

        countQuery

    ]);

    //------------------------------------------------
    // Total Records
    //------------------------------------------------

    const totalRecords = Number(
        totalResult[0].totalRecords
    );

    //------------------------------------------------
    // Total Pages
    //------------------------------------------------

    const totalPages = Math.ceil(
        totalRecords / pagination.pageSize
    );

    //------------------------------------------------
    // Response
    //------------------------------------------------

    return {

        data: students,

        meta: {

            page: pagination.page,

            pageSize: pagination.pageSize,

            totalRecords,

            totalPages

        }

    };

}

module.exports = {

    getStudentList

};