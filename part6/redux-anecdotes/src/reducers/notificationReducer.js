const notificationReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      const message = action.message;
      const time = action.time;
      const id = action.id;
      return { ...state, message, time, id };
    case "REMOVE_NOTIFICATION":
      if (action.id === state.id) {
        clearTimeout(action.id);
        return { ...state, message: "", time: 0, id: 0 };
      }
      return state;
    default:
      return state;
  }
};

const createNotification = (message, id, time) => {
  return {
    type: "NEW_NOTIFICATION",
    message,
    time,
    id,
  };
};

const removeNotification = (id) => {
  return {
    type: "REMOVE_NOTIFICATION",
    id,
  };
};
let nextNotfcId = 0;
export const setNotification = (message, time) => {
  return (dispatch) => {
    const id = nextNotfcId++;
    dispatch(createNotification(message, id, time));
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, time * 1000);
  };
};
export default notificationReducer;
