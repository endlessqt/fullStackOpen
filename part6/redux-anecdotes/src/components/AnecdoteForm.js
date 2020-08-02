import React from "react";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import anecoteService from "../service/anecdotes";

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAdded = await anecoteService.create(anecdote);
    dispatch(newAnecdote(newAdded));
    dispatch(createNotification(`you added "${anecdote}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdotesForm;
