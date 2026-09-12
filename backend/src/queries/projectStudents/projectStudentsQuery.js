const db = require("../../config/db");

const buildProjectStudentsQuery = (staffId) => {
  return db("project_students as ps")
    .select(
      "ps.id",
      "ps.staffid",
      "ps.student_reg_no",
      "ps.student_name",
      "ps.batch"
    )
    .where("ps.staffid", staffId)
    .orderByRaw(`
      CASE
        WHEN ps.batch = 'IT Batch A' THEN 1
        WHEN ps.batch = 'IT Batch B' THEN 2
        WHEN ps.batch = 'AIDS' THEN 3
        ELSE 4
      END
    `)
    .orderBy("ps.student_reg_no", "asc");
};

module.exports = {
  buildProjectStudentsQuery,
};