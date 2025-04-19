import api from "./api";

export const getAllFeedback = async () => {
  try {
    const response = await api.get("/feedback");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch feedback" };
  }
};

export const getFeedbackById = async (id) => {
  try {
    const response = await api.get(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch feedback" };
  }
};

export const getUnreadFeedbackCount = async () => {
  try {
    const response = await api.get("/feedback/unread-count");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch unread feedback count",
      }
    );
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post("/feedback", feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to submit feedback" };
  }
};

export const markFeedbackAsRead = async (id) => {
  try {
    const response = await api.patch(`/feedback/${id}/mark-as-read`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to mark feedback as read" }
    );
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await api.delete(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete feedback" };
  }
};
