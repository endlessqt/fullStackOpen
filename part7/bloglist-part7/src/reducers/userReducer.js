import loginService from "../services/login";
import blogService from "../services/blogs";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOG_IN": {
      const user = action.user;
      window.localStorage.setItem("userLoggedInBlogsApp", JSON.stringify(user));
      return (state = user);
    }
    case "SET_USER": {
      const user = action.user;
      blogService.setToken(user.token);
      return (state = user);
    }
    case "LOG_OUT": {
      window.localStorage.removeItem("userLoggedInBlogsApp");
      return (state = null);
    }
    default:
      return state;
  }
};

export const userLogin = (userInfo) => {
  return async (dispatch) => {
    const user = await loginService.login(userInfo);
    return dispatch({
      type: "LOG_IN",
      user,
    });
  };
};

export const userLogout = () => {
  return {
    type: "LOG_OUT",
  };
};

export const setUser = () => {
  return (dispatch) => {
    const userJSON = window.localStorage.getItem("userLoggedInBlogsApp");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      return dispatch({
        type: "SET_USER",
        user,
      });
    }
  };
};
export default reducer;
