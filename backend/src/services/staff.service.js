const {
  buildStaffListQuery,
} = require("../queries/staff/staffListQuery");

const {
  buildStaffDetailQuery,
} = require("../queries/staff/staffDetailQuery");

const {
  buildFAListQuery,
} = require("../queries/staff/faListQuery");

const {
    buildFAStudentsQuery
} = require("../queries/staff/faStudentsQuery");

const getStaffList = async (filters = {}) => {
  const page = Math.max(parseInt(filters.page, 10) || 1, 1);

  const pageSize = Math.min(
    Math.max(parseInt(filters.pageSize, 10) || 10, 1),
    100
  );

  const queryFilters = {
    ...filters,
    page,
    pageSize,
  };

  const staff = await buildStaffListQuery(queryFilters);

  return {
    data: staff,
    pagination: {
      page,
      pageSize,
      count: staff.length,
    },
  };
};

const getStaffDetails = async (staffId) => {
  const staff = await buildStaffDetailQuery(staffId);

  if (!staff) {
    const error = new Error("Staff member not found");
    error.statusCode = 404;
    throw error;
  }

  return staff;
};

const getFAList = async () => {
  const rows = await buildFAListQuery();

  return rows;
};

const getFAStudents = async (faId, yearNumber, branchId) => {

    const students = await buildFAStudentsQuery(
        faId,
        yearNumber,
        branchId
    );

    return students;
};

module.exports = {
  getStaffList,
  getStaffDetails,
  getFAList,
  getFAStudents,
};