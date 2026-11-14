
import axios from "axios";

const API_URL = " https://children-app-back-end3.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

// Get all videos
export const getVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};

// Add a new video
export const addVideo = async (videoData) => {
  const response = await api.post("/videos", videoData);
  return response.data;
};

// Update a video
export const updateVideo = async (id, videoData) => {
  const response = await api.put(`/videos/${id}`, videoData);
  return response.data;
};

// Delete a video
export const deleteVideo = async (id) => {
  const response = await api.delete(`/videos/${id}`);
  return response.data;
};

// Get existing students
export const getStudents = async () => {
  const response = await api.get("/student");
  return response.data;
};
