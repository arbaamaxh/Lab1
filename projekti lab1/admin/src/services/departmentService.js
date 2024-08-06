import axios from 'axios';

const API_URL = "http://localhost:3001/departments";

export const fetchDepartments = async () => {
  return await axios.get(API_URL);
};

export const addDepartment = async (department) => {
  return await axios.post(API_URL, department);
};

export const updateDepartment = async (id, department) => {
  return await axios.put(`${API_URL}/${id}`, department);
};

export const deleteDepartment = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};