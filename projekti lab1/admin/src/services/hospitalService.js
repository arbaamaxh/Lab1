import axios from 'axios';

const API_URL = "http://localhost:3001/hospitals";

export const fetchHospitals = async () => {
  return await axios.get(API_URL);
};

export const addHospital = async (hospital) => {
  return await axios.post(API_URL, hospital);
};

export const updateHospital = async (id, hospital) => {
  return await axios.put(`${API_URL}/${id}`, hospital);
};

export const deleteHospital = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};