import api from "./axios";

export const getProfile = () =>
  api.get("/users/profile");

export const updateProfile = (data,id) =>
  api.post(`/onboarding/${id}`, data);
