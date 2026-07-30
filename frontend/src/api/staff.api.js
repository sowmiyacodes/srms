import axios from "./axios";

export const getStaffList = async (params = {}) => {
  const response = await axios.get("/staff", {
    params,
  });

  return response.data;
};

export const getFacultyList = async () => {
  const response = await axios.get("/staff/faculty");

  return response.data;
};

export const getStaffDetails = async (staffId) => {
  const response = await axios.get(`/staff/${staffId}`);

  return response.data;
};