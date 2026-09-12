const db = require("../../config/db");

const buildGuestFacultyListQuery = async () => {
  return await db("staff as s")
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
    .where("s.designation", "Guest Faculty")
    .orderBy("s.staffname", "asc");
};

module.exports = {
  buildGuestFacultyListQuery,
};