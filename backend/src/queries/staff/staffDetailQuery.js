const db = require("../../config/db");

const buildStaffDetailQuery = (staffId) => {
  return db("staff as s")
    .select(
      "s.staffid",
      "s.staffcode",
      "s.staffname",
      "s.emailid",
      "s.mobileno",
      "s.departmentid",
      "s.designation",
      "s.staff_web_page"
    )
    .where("s.staffid", staffId)
    .first();
};

module.exports = {
  buildStaffDetailQuery,
};