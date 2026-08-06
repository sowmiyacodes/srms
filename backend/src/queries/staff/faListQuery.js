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
    )
    .count("st.studentid as studentCount")
    .groupBy(
      "st.regno",
      "s.staffid",
      "s.staffname",
      "s.emailid",
      "s.mobileno"
    )
    .orderBy("st.regno", "asc");

  console.log(rows);

  return rows;
};

module.exports = {
  buildFAListQuery,
};