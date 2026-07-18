/**
 * applies pagination to the student query.
 *
 * supported query params:
 * -----------------------
 * page
 * pagesize
 */

function applypagination(query, filters) {

    const page = Number(filters.page) || 1;
    const pagesize = Number(filters.pagesize) || 20;

    const offset = (page - 1) * pagesize;

    query
        .limit(pagesize)
        .offset(offset);

    return query;
}


module.exports = {
    applypagination
};