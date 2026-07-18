/**
 * Applies global search to Student Listing.
 *
 * Searches across:
 * - Reg No
 * - Name
 * - Mobile No
 * - Email
 * - Branch Name
 */

function applySearchFilter(query, filters) {

    const { search } = filters;

    if (!search) {
        return query;
    }

    const keyword = `%${search}%`;

    query.andWhere(function () {

        this.whereILike("s.RegNo", keyword)

            .orWhereILike("s.Name", keyword)

            .orWhereILike("s.MobileNo", keyword)

            .orWhereILike("s.EmailID", keyword)

            .orWhereILike("b.BranchName", keyword);

    });

    return query;
}

module.exports = {
    applySearchFilter
};