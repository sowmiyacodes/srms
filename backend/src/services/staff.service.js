const {
  buildStaffListQuery,
} = require("../queries/staff/staffListQuery");

const {
  buildStaffDetailQuery,
} = require("../queries/staff/staffDetailQuery");

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

module.exports = {
  getStaffList,
  getStaffDetails,
};