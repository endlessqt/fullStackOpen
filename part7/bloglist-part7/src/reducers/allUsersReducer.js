import usersService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL": {
      return (state = action.data);
    }
    default:
      return state;
  }
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "FETCH_ALL",
      data: users,
    });
  };
};

export default reducer;
