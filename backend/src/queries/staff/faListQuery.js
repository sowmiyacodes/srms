const db = require("../../config/db");

const buildFAListQuery = async () => {
  console.log("FA Query Hit");

  const rows = await db("student as st")
    .join("staff as s", "st.fa_id", "s.staffid")
    .select(
      "st.regno",
      "s.staffid",
      "s.staffname",
      "s.emailid",
      "s.mobileno"
    );

  console.log(rows);

  return rows;
};

module.exports = {
  buildFAListQuery,
};