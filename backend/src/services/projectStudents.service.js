const {
  buildProjectStudentsQuery,
} = require("../queries/projectStudents/projectStudentsQuery");

const getProjectStudentsByStaff = async (staffId) => {
  const students = await buildProjectStudentsQuery(staffId);

  return students;
};

module.exports = {
  getProjectStudentsByStaff,
};