import anecdoteService from "../service/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id === id ? changedAnecdote : a));
    }
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const voteFor = (id, anecdote) => {
  return async (dispatch) => {
    const newObj = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.update(id, newObj);
    dispatch({
      type: "VOTE",
      data: {
        id,
      },
    });
  };
};
export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};
export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newObj = await anecdoteService.create(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newObj,
    });
  };
};
export default reducer;
