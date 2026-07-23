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
        // Faculty Advisor
        // -----------------------------

        .leftJoin(
            "staff as fa",
            "s.fa_id",
            "fa.staffid"
        )

        // -----------------------------
        // Father
        // -----------------------------

        .leftJoin("student_parent as spf", function () {

            this.on("s.studentid", "=", "spf.studentid")
                .andOn(
                    "spf.relationship",
                    "=",
                    knex.raw("?", ["Father"])
                );

        })

        .leftJoin(
            "parent_guardian as pf",
            "spf.parentid",
            "pf.parentid"
        )

        // -----------------------------
        // Mother
        // -----------------------------

        .leftJoin("student_parent as spm", function () {

            this.on("s.studentid", "=", "spm.studentid")
                .andOn(
                    "spm.relationship",
                    "=",
                    knex.raw("?", ["Mother"])
                );

        })

        .leftJoin(
            "parent_guardian as pm",
            "spm.parentid",
            "pm.parentid"
        )

        // -----------------------------
        // Guardian
        // -----------------------------

        .leftJoin("student_parent as spg", function () {

            this.on("s.studentid", "=", "spg.studentid")
                .andOn(
                    "spg.relationship",
                    "=",
                    knex.raw("?", ["Guardian"])
                );

        })

        .leftJoin(
            "parent_guardian as pg",
            "spg.parentid",
            "pg.parentid"
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

            "et.entrytypename",

            // Faculty Advisor

            "fa.staffid as facultyId",

            "fa.staffcode as facultyCode",

            "fa.staffname as facultyName",

            "fa.emailid as facultyEmail",

            "fa.mobileno as facultyMobile",

            "fa.designation as facultyDesignation",

            // Father

            "pf.parentname as fatherName",

            "pf.mobileno as fatherNo",

            "pf.email as fatherEmail",

            "pf.profession as fatherProfession",

            "pf.annualincome as fatherIncome",

            // Mother

            "pm.parentname as motherName",

            "pm.mobileno as motherNo",

            "pm.email as motherEmail",

            "pm.profession as motherProfession",

            "pm.annualincome as motherIncome",

            // Guardian

            "pg.parentname as guardianName",

            "pg.mobileno as guardianNo",

            "pg.email as guardianEmail",

            "pg.profession as guardianProfession",

            "pg.annualincome as guardianIncome"

        );

}

module.exports = {
    createBaseQuery,
};