/**
 * applies sorting to the student query.
 *
 * supported query params:
 * -----------------------
 * sortby
 * sortorder
 */

const sortablecolumns = require("../../constants/sortablecolumns");


function applysorting(query, filters) {

    const {
        sortby = "name",
        sortorder = "asc"
    } = filters;


    // get actual database column
    const column = sortablecolumns[sortby];


    // ignore invalid sort column
    if (!column) {
        return query.orderBy(
            "s.name",
            "asc"
        );
    }


    // only allow asc or desc
    const order =
        sortorder.toLowerCase() === "desc"
            ? "desc"
            : "asc";


    query.orderBy(
        column,
        order
    );


    return query;
}


module.exports = {
    applysorting
};