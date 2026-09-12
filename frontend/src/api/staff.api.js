import axios from "./axios";

export const getStaffList = async (params = {}) => {
  return await axios.get("/staff", {
    params,
  });
};

export const getFacultyList = async () => {
  return await axios.get("/staff/faculty");
};

export const getStaffDetails = async (staffId) => {
  return await axios.get(`/staff/${staffId}`);
};

export const getFAList = async () => {
  return await axios.get("/staff/fa");
};

export const getGuestFacultyList = async () => {
  return await axios.get("/staff/guest-faculty");
};

export const getProjectStudentsByStaff = async (staffId) => {
  const response = await axios.get(
    `/staff/${staffId}/project-students`
  );

  return response.data;
};