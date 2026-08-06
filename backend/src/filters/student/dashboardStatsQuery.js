const knex = require("../../config/db");

function buildDashboardStatsQuery(query) {
    return query
        .clone()
        .clearSelect()
        .clearOrder()
        .clear("limit")
        .clear("offset")
        .select([
            knex.raw("COUNT(*) AS totalStudents"),

            knex.raw(`
                SUM(
                    CASE
                        WHEN LOWER(b.branchname) LIKE '%information technology%'
                             OR LOWER(b.branchname) = 'it'
                        THEN 1 ELSE 0
                    END
                ) AS "itStudents"
            `),

            knex.raw(`
                SUM(
                    CASE
                        WHEN LOWER(b.branchname) LIKE '%artificial intelligence and data science%'
                             OR LOWER(b.branchname) = 'aids'
                        THEN 1 ELSE 0
                    END
                ) AS "aidsStudents"
            `),

            knex.raw(`
                SUM(CASE WHEN s.ishosteller = TRUE THEN 1 ELSE 0 END)
                AS "hostellers"
            `),

            knex.raw(`
                SUM(CASE WHEN s.ishosteller = FALSE THEN 1 ELSE 0 END)
                AS "dayScholars"
            `)
        ])
        .first();
}

module.exports = {
    buildDashboardStatsQuery,
};