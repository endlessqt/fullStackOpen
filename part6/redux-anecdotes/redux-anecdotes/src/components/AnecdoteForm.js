import React from "react";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(anecdote));
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
