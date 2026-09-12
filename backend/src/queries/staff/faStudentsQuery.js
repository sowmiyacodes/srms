const db = require("../../config/db");

/**
 * Get students belonging to a specific Faculty Advisor
 * for a specific academic year and branch.
 */
const buildFAStudentsQuery = async (faId, yearNumber, branchId) => {

    const query = db("student as s")

        // -----------------------------
        // Branch
        // -----------------------------

        .leftJoin(
            "branch as b",
            "s.branchid",
            "b.branchid"
        )

        // -----------------------------
        // Faculty Advisor
        // -----------------------------

        .leftJoin(
            "staff as fa",
            "s.fa_id",
            "fa.staffid"
        )

        // -----------------------------
        // Select
        // -----------------------------

        .select(

            "s.studentid",
            "s.regno",
            "s.name",
            "s.gender",
            "s.dob",
            "s.mobileno",
            "s.emailid",
            "s.dateofjoining",
            "s.status",
            "s.bloodgroup",
            "s.ishosteller",
            "s.nationality",

            // Branch

            "b.branchid",
            "b.branchname",
            "b.degree",

            // Faculty Advisor

            "fa.staffid as facultyId",
            "fa.staffcode as facultyCode",
            "fa.staffname as facultyName",
            "fa.emailid as facultyEmail",
            "fa.mobileno as facultyMobile",
            "fa.designation as facultyDesignation"

        )

        // -----------------------------
        // Faculty Advisor Filter
        // -----------------------------

        .where(
            "s.fa_id",
            faId
        )

        // -----------------------------
        // Branch Filter
        // -----------------------------

        .where(
            "s.branchid",
            branchId
        )

        // -----------------------------
        // Exclude Lateral Students
        // Same condition as faListQuery
        // -----------------------------

        .whereRaw(
            "SUBSTRING(s.regno, 8, 1) <> '3'"
        )

        // -----------------------------
        // Academic Year Filter
        // Same calculation as faListQuery
        // -----------------------------

        .whereRaw(`
            CASE
                WHEN EXTRACT(MONTH FROM CURRENT_DATE) > 6
                THEN
                    EXTRACT(YEAR FROM CURRENT_DATE)::integer
                    - SUBSTRING(s.regno, 1, 4)::integer
                    + 1
                ELSE
                    EXTRACT(YEAR FROM CURRENT_DATE)::integer
                    - SUBSTRING(s.regno, 1, 4)::integer
            END = ?
        `, [yearNumber])

        // -----------------------------
        // Sorting
        // -----------------------------

        .orderBy("s.regno", "asc");

    return await query;
};

module.exports = {
    buildFAStudentsQuery
};