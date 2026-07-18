/**
 * Builds the COUNT query for pagination.
 *
 * This function clones the filtered query and converts it
 * into a COUNT query without affecting the original query.
 *
 * Returns:
 * --------
 * Knex Query Builder
 */

function buildCountQuery(query) {

    return query
        .clone()

        // Remove SELECT columns
        .clearSelect()

        // Remove ORDER BY
        .clearOrder()

        // Remove LIMIT
        .clear("limit")

        // Remove OFFSET
        .clear("offset")

        // Count distinct students
        .countDistinct({
            totalRecords: "s.studentid"
        });

}

module.exports = {
    buildCountQuery,
};