/**
 * Applies role-based data access restrictions.
 *
 * HOD
 * ---
 * Can view all students.
 *
 * Faculty
 * --------
 * Can view only students assigned as Faculty Advisor.
 */

function applyRoleFilter(query, user) {

    if (!user) {
        return;
    }

    switch (user.role) {
        case "admin":
        // Admin can view all students
        break;
        case "hod":
            // No restriction
            break;

        case "faculty":

            query.where(
                "s.fa_id",
                user.staffId
            );

            break;

        default:

            query.whereRaw("1 = 0");

    }

}

module.exports = {
    applyRoleFilter,
};