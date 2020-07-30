import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

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
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((a) => (
        <Anecdote
          key={a.id}
          anecdote={a}
          handleClick={() => dispatch(voteFor(a.id))}
        />
      ))}
    </div>
  );
};

export default AnecdotesList;
