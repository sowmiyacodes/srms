/**
 * Applies EXISTS based filters.
 *
 * Supported Filters
 * -----------------
 * city
 * state
 * hasScholarship
 */

function applyExistsFilters(query, params) {

    //------------------------------------
    // Permanent City
    //------------------------------------

    if (params.city) {

        query.whereExists(function () {

            this.select(1)

                .from("student_address as sa")

                .whereRaw("sa.studentid = s.studentid")

                .where("sa.addresstype", "Permanent")

                .whereILike(
                    "sa.city",
                    `%${params.city}%`
                );

        });

    }


    //------------------------------------
    // Permanent State
    //------------------------------------

    if (params.state) {

        query.whereExists(function () {

            this.select(1)

                .from("student_address as sa")

                .whereRaw("sa.studentid = s.studentid")

                .where("sa.addresstype", "Permanent")

                .whereILike(
                    "sa.state",
                    `%${params.state}%`
                );

        });

    }


    //------------------------------------
    // Has Scholarship
    //------------------------------------

    if (params.hasScholarship === "true") {

        query.whereExists(function () {

            this.select(1)

                .from("STUDENT_SCHOLARSHIP as ss")

                .whereRaw(
                    "ss.StudentID = s.StudentID"
                );

        });

    }


    //------------------------------------
    // No Scholarship
    //------------------------------------

    if (params.hasScholarship === "false") {

        query.whereNotExists(function () {

            this.select(1)

                .from("STUDENT_SCHOLARSHIP as ss")

                .whereRaw(
                    "ss.StudentID = s.StudentID"
                );

        });

    }

}

module.exports = {
    applyExistsFilters,
};