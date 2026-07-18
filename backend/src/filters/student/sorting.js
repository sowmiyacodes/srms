const sortableColumns = require("../../constants/sortableColumns");

/**
 * Applies sorting to the student list query.
 *
 * Query Params
 * ------------
 * sortBy
 * sortOrder
 *
 * Example
 * --------
 * ?sortBy=name&sortOrder=asc
 */

function applySorting(query, params) {

    //--------------------------------------
    // Default Values
    //--------------------------------------

    const sortBy = params.sortBy || "name";

    const sortOrder =
        params.sortOrder &&
        params.sortOrder.toLowerCase() === "desc"
            ? "desc"
            : "asc";

    //--------------------------------------
    // Validate Column
    //--------------------------------------

    const column =
        sortableColumns[sortBy] ||
        sortableColumns.name;

    //--------------------------------------
    // Apply ORDER BY
    //--------------------------------------

    query.orderBy(column, sortOrder);

}

module.exports = {
    applySorting,
};