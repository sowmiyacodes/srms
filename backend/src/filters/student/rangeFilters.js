/**
 * Applies all date range filters.
 *
 * Supported Filters
 * -----------------
 * dobFrom
 * dobTo
 *
 * joiningFrom
 * joiningTo
 */

function applyRangeFilters(query, params) {

    //-----------------------------
    // Date of Birth
    //-----------------------------

    if (params.dobFrom && params.dobTo) {

        query.whereBetween(
            "s.dob",
            [params.dobFrom, params.dobTo]
        );

    } else {

        if (params.dobFrom) {

            query.where(
                "s.dob",
                ">=",
                params.dobFrom
            );

        }

        if (params.dobTo) {

            query.where(
                "s.dob",
                "<=",
                params.dobTo
            );

        }

    }


    //-----------------------------
    // Date of Joining
    //-----------------------------

    if (params.joiningFrom && params.joiningTo) {

        query.whereBetween(
            "s.dateofjoining",
            [
                params.joiningFrom,
                params.joiningTo
            ]
        );

    } else {

        if (params.joiningFrom) {

            query.where(
                "s.dateofjoining",
                ">=",
                params.joiningFrom
            );

        }

        if (params.joiningTo) {

            query.where(
                "s.dateofjoining",
                "<=",
                params.joiningTo
            );

        }

    }

}

module.exports = {
    applyRangeFilters,
};