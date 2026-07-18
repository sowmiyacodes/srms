/**
 * Applies date range filters.
 *
 * Supported Filters:
 * -------------------
 * dobFrom
 * dobTo
 * joiningFrom
 * joiningTo
 */

function applyRangeFilters(query, filters) {

    const {
        dobFrom,
        dobTo,
        joiningFrom,
        joiningTo
    } = filters;

    // -------------------------
    // DOB Range
    // -------------------------

    if (dobFrom) {
        query.where("s.DOB", ">=", dobFrom);
    }

    if (dobTo) {
        query.where("s.DOB", "<=", dobTo);
    }

    // -------------------------
    // Joining Date Range
    // -------------------------

    if (joiningFrom) {
        query.where("s.DateOfJoining", ">=", joiningFrom);
    }

    if (joiningTo) {
        query.where("s.DateOfJoining", "<=", joiningTo);
    }

    return query;
}

module.exports = {
    applyRangeFilters
};