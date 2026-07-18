/**
 * Applies EXISTS filters.
 *
 * Supported Filters:
 * -------------------
 * city
 * state
 * hasScholarship
 */

function applyExistsFilters(query, filters) {

    const {
        city,
        state,
        hasScholarship
    } = filters;

    // -------------------------
    // Permanent Address - City
    // -------------------------

    if (city) {

        query.whereExists(function () {

            this.select(1)
                .from("STUDENT_ADDRESS as sa")
                .whereRaw("sa.StudentID = s.StudentID")
                .where("sa.AddressType", "Permanent")
                .whereILike("sa.City", `%${city}%`);

        });

    }

    // -------------------------
    // Permanent Address - State
    // -------------------------

    if (state) {

        query.whereExists(function () {

            this.select(1)
                .from("STUDENT_ADDRESS as sa")
                .whereRaw("sa.StudentID = s.StudentID")
                .where("sa.AddressType", "Permanent")
                .whereILike("sa.State", `%${state}%`);

        });

    }

    // -------------------------
    // Scholarship Exists
    // -------------------------

    if (hasScholarship === "true") {

        query.whereExists(function () {

            this.select(1)
                .from("STUDENT_SCHOLARSHIP as ss")
                .whereRaw("ss.StudentID = s.StudentID");

        });

    }

    // -------------------------
    // Scholarship Doesn't Exist
    // -------------------------

    if (hasScholarship === "false") {

        query.whereNotExists(function () {

            this.select(1)
                .from("STUDENT_SCHOLARSHIP as ss")
                .whereRaw("ss.StudentID = s.StudentID");

        });

    }

    return query;
}

module.exports = {
    applyExistsFilters
};