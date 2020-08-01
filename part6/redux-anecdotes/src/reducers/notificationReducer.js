const notificationReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      const message = action.data.message;
      return { ...state, message };
    case "REMOVE_NOTIFICATION":
      const messageInState = state.message;
      const messageInCreator = action.data.message;
      if (messageInState === messageInCreator) {
        return { ...state, message: "" };
      }
      return state;
    default:
      return state;
  }
};

export const createNotification = (message) => {
  return {
    type: "NEW_NOTIFICATION",
    data: {
      message,
    },
  };
};

export const removeNotification = (message) => {
  return {
    type: "REMOVE_NOTIFICATION",
    data: {
      message,
    },
  };
};

export default notificationReducer;
