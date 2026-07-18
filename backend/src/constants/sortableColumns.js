/**
 * allowed sorting columns for student listing screen.
 *
 * key   -> value received from frontend
 * value -> actual postgresql column
 */

const sortablecolumns = {

    // student table

    studentid: "s.studentid",

    regno: "s.regno",

    name: "s.name",

    gender: "s.gender",

    dob: "s.dob",

    mobileno: "s.mobileno",

    email: "s.emailid",

    joiningdate: "s.dateofjoining",

    status: "s.status",

    bloodgroup: "s.bloodgroup",

    nationality: "s.nationality",

    ishosteller: "s.ishosteller",


    // branch

    branch: "b.branchname",

    degree: "b.degree",


    // community

    community: "c.communityname",


    // religion

    religion: "r.religionname",


    // admission type

    admissiontype: "at.admissiontypename",


    // entry type

    entrytype: "et.entrytypename"

};

module.exports = sortablecolumns;