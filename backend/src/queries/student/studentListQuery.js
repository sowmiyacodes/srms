const { applybasicfilters } = require("../../filters/student/basicfilters");
const { createbasequery } = require("../../filters/student/basequery");
const { applyexistsfilters } = require("../../filters/student/existsfilters");
const { applypagination } = require("../../filters/student/pagination");
const { applyrangefilters } = require("../../filters/student/rangefilters");
const { applysearchfilter } = require("../../filters/student/searchfilters");
const { applysorting } = require("../../filters/student/sorting");
const { buildcountquery } = require("../../filters/student/countquery");

async function getStudentList(filters) {

    const query = createbasequery();

    applybasicfilters(query, filters);
    applysearchfilter(query, filters);
    applyrangefilters(query, filters);
    applyexistsfilters(query, filters);

    const countquery = buildcountquery(query);

    applysorting(query, filters);
    applypagination(query, filters);

    const [students, countresult] = await Promise.all([
        query,
        countquery
    ]);

    return {
        data: students,
        totalrecords: Number(countresult[0].totalrecords)
    };
}

module.exports = {
    getStudentList
};