/**
 * Allowed sorting columns for Student Listing Screen.
 *
 * Key   -> value received from frontend
 * Value -> actual PostgreSQL column
 */

const sortableColumns = {

    // Student Table

    studentId: "s.StudentID",

    regNo: "s.RegNo",

    name: "s.Name",

    gender: "s.Gender",

    dob: "s.DOB",

    mobileNo: "s.MobileNo",

    email: "s.EmailID",

    joiningDate: "s.DateOfJoining",

    status: "s.Status",

    bloodGroup: "s.BloodGroup",

    nationality: "s.Nationality",

    isHosteller: "s.IsHosteller",



    // Branch

    branch: "b.BranchName",

    degree: "b.Degree",



    // Community

    community: "c.CommunityName",



    // Religion

    religion: "r.ReligionName",



    // Admission Type

    admissionType: "at.AdmissionTypeName",



    // Entry Type

    entryType: "et.EntryTypeName"

};

module.exports = sortableColumns;