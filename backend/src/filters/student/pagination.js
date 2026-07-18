/**
 * Applies pagination to the query.
 *
 * Query Parameters
 * ----------------
 * page
 * pageSize
 *
 * Default
 * -------
 * page = 1
 * pageSize = 20
 *
 * Maximum pageSize = 100
 */

function applyPagination(query, params) {

    //--------------------------------------
    // Page
    //--------------------------------------

    let page = Number(params.page) || 1;

    if (page < 1) {
        page = 1;
    }

    //--------------------------------------
    // Page Size
    //--------------------------------------

    let pageSize = Number(params.pageSize) || 100;

    if (pageSize < 1) {
        pageSize = 20;
    }

    // Prevent huge queries
    if (pageSize > 100) {
        pageSize = 100;
    }

    //--------------------------------------
    // Offset
    //--------------------------------------

    const offset = (page - 1) * pageSize;

    //--------------------------------------
    // Apply
    //--------------------------------------

    query
        .limit(pageSize)
        .offset(offset);

    //--------------------------------------
    // Return values
    //--------------------------------------

    return {
        page,
        pageSize,
        offset
    };

}

module.exports = {
    applyPagination,
};