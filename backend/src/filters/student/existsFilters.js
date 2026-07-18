/**
 * applies exists filters.
 *
 * supported filters:
 * -------------------
 * city
 * state
 * hasscholarship
 */

function applyexistsfilters(query, filters) {

    const {
        city,
        state,
        hasscholarship
    } = filters;


    // -------------------------
    // permanent address - city
    // -------------------------

    if (city) {

        query.whereExists(function () {

            this.select(1)
                .from("student_address as sa")
                .whereRaw("sa.studentid = s.studentid")
                .where("sa.addresstype", "permanent")
                .whereILike(
                    "sa.city",
                    `%${city}%`
                );

        });

    }


    // -------------------------
    // permanent address - state
    // -------------------------

    if (state) {

        query.whereExists(function () {

            this.select(1)
                .from("student_address as sa")
                .whereRaw("sa.studentid = s.studentid")
                .where("sa.addresstype", "permanent")
                .whereILike(
                    "sa.state",
                    `%${state}%`
                );

        });

    }


    // -------------------------
    // scholarship exists
    // -------------------------

    if (hasscholarship === "true") {

        query.whereExists(function () {

            this.select(1)
                .from("student_scholarship as ss")
                .whereRaw(
                    "ss.studentid = s.studentid"
                );

        });

    }


    // -------------------------
    // scholarship doesn't exist
    // -------------------------

    if (hasscholarship === "false") {

        query.whereNotExists(function () {

            this.select(1)
                .from("student_scholarship as ss")
                .whereRaw(
                    "ss.studentid = s.studentid"
                );

        });

    }


    return query;
}


module.exports = {
    applyexistsfilters
};