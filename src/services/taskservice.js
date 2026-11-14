
import axios from "axios";

// Base URL
const API_URL = " https://children-app-back-end3.onrender.com";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// ===============================
// TASK API FUNCTIONS
// ===============================

// Get all tasks
export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// Add a new task
export const addTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

// ===============================
// STUDENT API FUNCTIONS
// ===============================

// Get all students
export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

// ===============================
// SUBMISSION API FUNCTIONS
// ===============================

// Get all submissions
export const getSubmissions = async () => {
  const response = await api.get("/submissions");
  return response.data;
};

// Get submissions for a particular task
export const getTaskSubmissions = async (taskId) => {
  const response = await api.get(`/submissions?taskId=${taskId}`);
  return response.data;
};

// Review a student submission
export const reviewSubmission = async (id, reviewData) => {
  const response = await api.patch(
    `/submissions/${id}`,
    reviewData
  );
  return response.data;
};

export const deleteSubmission = async (id) => {
  const response = await api.delete(`/submissions/${id}`);
  return response.data;
};