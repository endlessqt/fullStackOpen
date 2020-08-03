import React from "react";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdotesForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.newAnecdote(anecdote);
    props.setNotification(anecdote, 5);
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

export default connect(null, { newAnecdote, setNotification })(AnecdotesForm);
