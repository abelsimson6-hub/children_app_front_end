import axios from "axios";

const API_URL = " https://children-app-back-end3.onrender.com/student";

// GET
export const getActivities = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST
export const addActivity = async (activity) => {
  const response = await axios.post(API_URL, activity);
  return response.data;
};

// PUT
export const updateActivity = async (id, activity) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    activity
  );

  return response.data;
};

// DELETE
export const deleteActivity = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};
