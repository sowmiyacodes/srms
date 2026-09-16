const db = require("../../config/db");

const buildStaffListQuery = (filters = {}) => {
  const {
    search,
    designation,
    departmentid,
    page = 1,
    pageSize = 10,
  } = filters;

  const offset = (page - 1) * pageSize;

  const query = db("staff as s")
  .select(
    "s.staffid",
    "s.staffcode",
    "s.staffname",
    "s.emailid",
    "s.mobileno",
    "s.departmentid",
    "s.designation",
    "s.staff_web_page",
    "s.roles"
  )
  .whereNot("s.designation", "Guest Faculty")
  // .orderBy("s.staffname", "asc")
  // .limit(pageSize)
  // .offset(offset);

  if (search) {
    query.where(function () {
      this.whereILike("s.staffname", `%${search}%`)
        .orWhereILike("s.staffcode", `%${search}%`)
        .orWhereILike("s.emailid", `%${search}%`);
    });
  }

  if (designation) {
    query.where("s.designation", designation);
  }

  if (departmentid) {
    query.where("s.departmentid", departmentid);
  }

  query .orderByRaw(` 
        CASE 
          WHEN LOWER(TRIM(s.designation)) = 'professor' THEN 1 
          WHEN LOWER(TRIM(s.designation)) = 'associate professor' THEN 2 
          WHEN LOWER(TRIM(s.designation)) = 'assistant professor' THEN 3 
          WHEN LOWER(TRIM(s.designation)) = 'teaching fellow' THEN 4 
          ELSE 999 
          END ASC 
          `) 
          .orderBy("s.staffname", "asc") 
          .limit(pageSize) 
          .offset(offset);
  return query;
};

module.exports = {
  buildStaffListQuery,
};