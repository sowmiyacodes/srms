/**
 * Applies global search filter.
 *
 * Searches across:
 * - Reg No
 * - Student Name
 * - Mobile No
 * - Email ID
 * - Branch Name
 */

function applySearchFilter(query, params) {

    // Nothing to search
    if (!params.search || params.search.trim() === "") {
        return;
    }

    const keyword = `%${params.search.trim()}%`;

    query.andWhere(function () {

        this.whereILike("s.regno", keyword)

            .orWhereILike("s.name", keyword)

            .orWhereILike("s.mobileno", keyword)

            .orWhereILike("s.emailid", keyword)

            .orWhereILike("b.branchname", keyword);

    });

}

module.exports = {
    applySearchFilter,
};