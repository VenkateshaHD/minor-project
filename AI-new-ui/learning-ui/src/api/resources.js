import api from "./axios";

/**
 * SEARCH + RANKED RESOURCES
 * GET /resources/ranked?topic=...
 */
export const getRankedResources = (topic,experienceLevel) => {
  const userId = localStorage.getItem("token");
  return api.get("/resources/ranked", {
    params: { topic, experience_level: experienceLevel, user_id:userId}
  });
};

/**
 * OPTIONAL (if you expose raw search later)
 * GET /resources/search?topic=...
 */
export const searchResources = (topic) => {
  return api.get("/resources/search", {
    params: { topic },
  });
};
