/**
 * Builds the count query for pagination.
 *
 * Clones the existing query (with all filters applied)
 * and converts it into a COUNT query.
 */

function buildCountQuery(query) {

    return query
        .clone()
        .clearSelect()
        .clearOrder()
        .countDistinct({
            totalRecords: "s.StudentID"
        });

}

module.exports = {
    buildCountQuery
};