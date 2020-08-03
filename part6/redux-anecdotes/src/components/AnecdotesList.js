import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdotesList = (props) => {
  const anecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);
  const handleVote = (id, anecdote) => {
    const message = `you voted for "${
      anecdotes.find((a) => id === a.id).content
    }"`;
    props.voteFor(id, anecdote);
    props.setNotification(message, 5);
  };
  return (
    <div>
      {anecdotes.map((a) => (
        <Anecdote
          key={a.id}
          anecdote={a}
          handleClick={() => handleVote(a.id, a)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const filter = state.filter;
  const anecdotes = state.anecdotes;
  const notification = state.notification;
  return {
    notification,
    anecdotes: anecdotes.filter((a) => a.content.includes(filter)),
  };
};

export default connect(mapStateToProps, { setNotification, voteFor })(
  AnecdotesList
);
