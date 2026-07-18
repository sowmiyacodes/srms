// queries/student/filters.js

function applyStudentFilters(query, filters) {

    if (filters.gender) {

        query.where("s.gender", filters.gender);

    }

    if (filters.branch) {

        query.where("b.branchname", filters.branch);

    }

    if (filters.community) {

        query.where("c.communityname", filters.community);

    }

    if (filters.admissionType) {

        query.where(
            "at.admissiontypename",
            filters.admissionType
        );

    }

    if (filters.entryType) {

        query.where(
            "et.entrytypename",
            filters.entryType
        );

    }

    if (filters.hosteller !== undefined) {

        query.where(
            "s.ishosteller",
            filters.hosteller
        );

    }
    if (filters.search) {

        query.where(function () {

            this.whereILike(
                "s.name",
                `%${filters.search}%`
            )

                .orWhereILike(
                    "s.regno",
                    `%${filters.search}%`
                )

                .orWhereILike(
                    "s.emailid",
                    `%${filters.search}%`
                );

        });

    }
    if (filters.minIncome!=null) {

        query

            .leftJoin(
                "student_parent as sp",
                "s.studentid",
                "sp.studentid"
            )

            .leftJoin(
                "parent_guardian as pg",
                "sp.parentid",
                "pg.parentid"
            );

        query.where(
            "pg.annualincome",
            ">=",
            filters.minIncome
        );

    }
    if (filters.minCGPA!=null) {

        query.leftJoin(

            "student_qualification as sq",

            "s.studentid",

            "sq.studentid"

        );

        query.where(

            "sq.cgpa",

            ">=",

            filters.minCGPA

        );

    }
}
module.exports = applyStudentFilters;