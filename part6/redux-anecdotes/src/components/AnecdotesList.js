import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
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

const AnecdotesList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((a) => a.content.includes(filter))
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const handleVote = (id, anecdote) => {
    const message = `you voted for "${
      anecdotes.find((a) => id === a.id).content
    }"`;
    dispatch(voteFor(id, anecdote));
    dispatch(setNotification(message, 5));
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

export default AnecdotesList;
