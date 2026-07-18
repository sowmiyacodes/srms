/**
 * Applies pagination to the student query.
 *
 * Supported Query Params:
 * -----------------------
 * page
 * pageSize
 */

function applyPagination(query, filters) {

    const page = Number(filters.page) || 1;
    const pageSize = Number(filters.pageSize) || 20;

    const offset = (page - 1) * pageSize;

    query
        .limit(pageSize)
        .offset(offset);

    return query;
}

module.exports = {
    applyPagination
};