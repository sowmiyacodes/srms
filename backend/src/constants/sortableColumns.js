/**
 * Allowed sorting columns for Student Listing Screen.
 *
 * Key   -> value received from frontend
 * Value -> actual PostgreSQL column
 */

const sortableColumns = {

    // Student Table

    studentId: "s.studentid",

    regNo: "s.regno",

    name: "s.name",

    gender: "s.gender",

    dob: "s.dob",

    mobileNo: "s.mobileno",

    email: "s.emailid",

    joiningDate: "s.dateofjoining",

    status: "s.status",

    bloodGroup: "s.bloodgroup",

    nationality: "s.nationality",

    isHosteller: "s.ishosteller",



    // Branch

    branch: "b.branchname",

    degree: "b.degree",



    // Community

    community: "c.communityname",



    // Religion

    religion: "r.religionname",



    // Admission Type

    admissionType: "at.admissiontypename",



    // Entry Type

    entryType: "et.entrytypename"

};

module.exports = sortableColumns;