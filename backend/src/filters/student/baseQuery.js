const knex = require("../../config/db");

/**
 * Creates the base query for Student Listing Screen.
 *
 * Includes:
 * - Base STUDENT table
 * - Required lookup table joins
 * - Columns required by frontend
 *
 * Returns:
 * Knex Query Builder
 */

function createBaseQuery() {
    return knex("STUDENT as s")

        // ===========================
        // Lookup Table Joins
        // ===========================

        .leftJoin(
            "BRANCH as b",
            "s.BranchID",
            "b.BranchID"
        )

        .leftJoin(
            "COMMUNITY as c",
            "s.CommunityID",
            "c.CommunityID"
        )

        .leftJoin(
            "RELIGION as r",
            "s.ReligionID",
            "r.ReligionID"
        )

        .leftJoin(
            "ADMISSION_TYPE as at",
            "s.AdmissionTypeID",
            "at.AdmissionTypeID"
        )

        .leftJoin(
            "STUDENT_ENTRY_TYPE as et",
            "s.EntryTypeID",
            "et.EntryTypeID"
        )

        // ===========================
        // Selected Columns
        // ===========================

        .select(

            // Student

            "s.StudentID",

            "s.RegNo",

            "s.Name",

            "s.Photo",

            "s.Gender",

            "s.DOB",

            "s.MobileNo",

            "s.EmailID",

            "s.DateOfJoining",

            "s.Status",

            "s.BloodGroup",

            "s.IsHosteller",

            "s.Nationality",

            // Branch

            "b.BranchID",

            "b.BranchName",

            "b.Degree",

            // Community

            "c.CommunityID",

            "c.CommunityName",

            // Religion

            "r.ReligionID",

            "r.ReligionName",

            // Admission Type

            "at.AdmissionTypeID",

            "at.AdmissionTypeName",

            // Entry Type

            "et.EntryTypeID",

            "et.EntryTypeName"

        );
}

module.exports = {
    createBaseQuery
};