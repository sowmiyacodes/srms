const knex = require("../../config/db");

/**
 * Creates the base query for Student Listing Screen.
 *
 * This query contains:
 * - FROM
 * - JOINs
 * - SELECT columns
 *
 * No filters, sorting or pagination should be added here.
 */

function createBaseQuery() {
    return knex("student as s")

        // -----------------------------
        // Lookup Table Joins
        // -----------------------------

        .leftJoin(
            "branch as b",
            "s.branchid",
            "b.branchid"
        )

        .leftJoin(
            "community as c",
            "s.communityid",
            "c.communityid"
        )

        .leftJoin(
            "religion as r",
            "s.religionid",
            "r.religionid"
        )

        .leftJoin(
            "admission_type as at",
            "s.admissiontypeid",
            "at.admissiontypeid"
        )

        .leftJoin(
            "student_entry_type as et",
            "s.entrytypeid",
            "et.entrytypeid"
        )

        // -----------------------------
        // Columns Required
        // -----------------------------

        .select(

            // Student

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

            // Community

            "c.communityid",

            "c.communityname",

            // Religion

            "r.religionid",

            "r.religionname",

            // Admission Type

            "at.admissiontypeid",

            "at.admissiontypename",

            // Entry Type

            "et.entrytypeid",

            "et.entrytypename"

        );
}

module.exports = {
    createBaseQuery,
};