const sortableColumns = {
    name: "s.name",
    regno: "s.regno",
    gender: "s.gender",
    email: "s.emailid",
    branch: "b.branchname",
    community: "c.communityname",
    admissionType: "at.admissiontypename",
    entryType: "et.entrytypename"
};

function applySorting(query, sortBy, order = "asc") {

    if (!sortBy) return;

    const column = sortableColumns[sortBy];

    if (!column) return;

    query.orderBy(column, order.toLowerCase() === "desc" ? "desc" : "asc");
}

module.exports = applySorting;