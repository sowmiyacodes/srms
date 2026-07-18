/**
 * applies global search to student listing.
 *
 * searches across:
 * - reg no
 * - name
 * - mobile no
 * - email
 * - branch name
 */

function applysearchfilter(query, filters) {

    const { search } = filters;

    if (!search) {
        return query;
    }

    const keyword = `%${search}%`;


    query.andWhere(function () {

        this.whereILike(
                "s.regno",
                keyword
            )

            .orWhereILike(
                "s.name",
                keyword
            )

            .orWhereILike(
                "s.mobileno",
                keyword
            )

            .orWhereILike(
                "s.emailid",
                keyword
            )

            .orWhereILike(
                "b.branchname",
                keyword
            );

    });


    return query;
}


module.exports = {
    applysearchfilter
};