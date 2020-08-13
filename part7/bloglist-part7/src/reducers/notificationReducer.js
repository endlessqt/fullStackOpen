const reducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION": {
      const { text, time, id } = action;
      return (state = { text, time, id });
    }
    case "HIDE_NOTIFICATION": {
      const id = action.id;
      if (id === state.id) {
        clearTimeout(id);
        return (state = null);
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export const hideNotification = (id) => {
  return {
    type: "HIDE_NOTIFICATION",
    id,
  };
};
let notificationId = 0;
export const showNotification = (text, time) => {
  return (dispatch) => {
    const id = notificationId++;
    dispatch({
      type: "SHOW_NOTIFICATION",
      text,
      time,
      id,
    });
    setTimeout(() => {
      dispatch(hideNotification(id));
    }, time * 1000);
  };
};

export default reducer;
