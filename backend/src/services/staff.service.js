const {
  buildStaffListQuery,
} = require("../queries/staff/staffListQuery");

const {
  buildStaffDetailQuery,
} = require("../queries/staff/staffDetailQuery");

const {
  buildFAListQuery,
} = require("../queries/staff/faListQuery");

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

/* =======================
   FA LIST
======================= */

/* =======================
   FA LIST
======================= */

const getFAList = async () => {
  const rows = await buildFAListQuery();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const unique = new Map();

  rows.forEach((row) => {
    const admissionYear = row.regno.substring(0, 4);
    const deptCode = row.regno.substring(4, 7);

    const key = `${admissionYear}-${deptCode}`;

    let academicYear = currentYear - Number(admissionYear);

    if (currentMonth > 6) {
      academicYear++;
    }

    let year = "-";

    switch (academicYear) {
      case 1:
        year = "I Year";
        break;
      case 2:
        year = "II Year";
        break;
      case 3:
        year = "III Year";
        break;
      case 4:
        year = "IV Year";
        break;
      default:
        year = `${academicYear} Year`;
    }

    const department =
      deptCode === "506"
        ? "IT"
        : deptCode === "510"
        ? "AIDS"
        : deptCode;

    if (!unique.has(key)) {
      unique.set(key, {
        year,
        department,
        studentCount: 1,
        faName: row.staffname,
        faNumber: row.mobileno,
        faEmail: row.emailid,
      });
    } else {
      unique.get(key).studentCount++;
    }
  });

  return [...unique.values()];
};
module.exports = {
  getStaffList,
  getStaffDetails,
  getFAList,
};