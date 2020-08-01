const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      const filter = action.filter;
      return filter;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: "FILTER",
    filter,
  };
};

export default filterReducer;
