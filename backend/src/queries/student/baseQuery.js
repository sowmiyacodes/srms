// queries/student/baseQuery.js

const knex = require("../../db/knex");

function createStudentListQuery() {

    return knex("student as s")

        .leftJoin("branch as b",
            "s.branchid",
            "b.branchid")

        .leftJoin("community as c",
            "s.communityid",
            "c.communityid")

        .leftJoin("admission_type as at",
            "s.admissiontypeid",
            "at.admissiontypeid")

        .leftJoin("student_entry_type as et",
            "s.entrytypeid",
            "et.entrytypeid")

        .select(

            "s.studentid",

            "s.regno",

            "s.name",

            "s.gender",

            "s.emailid",

            "s.mobileno",

            "s.ishosteller",

            "b.branchname",

            "c.communityname",

            "at.admissiontypename",

            "et.entrytypename"

        );

}

module.exports = createStudentListQuery;