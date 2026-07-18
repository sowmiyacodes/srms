/**
 * applies date range filters.
 *
 * supported filters:
 * -------------------
 * dobfrom
 * dobto
 * joiningfrom
 * joiningto
 */

function applyrangefilters(query, filters) {

    const {
        dobfrom,
        dobto,
        joiningfrom,
        joiningto
    } = filters;


    // -------------------------
    // dob range
    // -------------------------

    if (dobfrom) {
        query.where(
            "s.dob",
            ">=",
            dobfrom
        );
    }

    if (dobto) {
        query.where(
            "s.dob",
            "<=",
            dobto
        );
    }


    // -------------------------
    // joining date range
    // -------------------------

    if (joiningfrom) {
        query.where(
            "s.dateofjoining",
            ">=",
            joiningfrom
        );
    }

    if (joiningto) {
        query.where(
            "s.dateofjoining",
            "<=",
            joiningto
        );
    }


    return query;
}


module.exports = {
    applyrangefilters
};