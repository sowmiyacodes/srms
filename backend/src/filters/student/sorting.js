const sortableColumns = require("../../constants/sortableColumns");

/**
 * Applies sorting to the student query.
 *
 * Supported Query Params:
 * -----------------------
 * sortBy
 * sortOrder
 */

function applySorting(query, filters) {

    const {
        sortBy = "name",
        sortOrder = "asc"
    } = filters;

    // Get actual database column
    const column = sortableColumns[sortBy];

    // Ignore invalid sort column
    if (!column) {
        return query.orderBy("s.Name", "asc");
    }

    // Only allow asc or desc
    const order =
        sortOrder.toLowerCase() === "desc"
            ? "desc"
            : "asc";

    query.orderBy(column, order);

    return query;
}

module.exports = {
    applySorting
};