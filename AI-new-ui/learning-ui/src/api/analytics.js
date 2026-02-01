import api from "./axios";

/**
 * GLOBAL ANALYTICS
 * GET /analytics/summary
 */
export const getAnalyticsSummary = () => {
  return api.get("/analytics/summary");
};

/**
 * USER SEARCH HISTORY
 * GET /users/history
 */
export const getUserHistory = () => {
  return api.get("/users/history");
};
