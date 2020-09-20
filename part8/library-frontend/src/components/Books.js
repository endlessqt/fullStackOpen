import React, { useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
  const [filter, setFilter] = useState("all");
  const { loading, data } = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  const changeFilter = (genre) => {
    setFilter(genre);
  };
  const allGenres = Array.from(
    new Set(data.allBooks.map((b) => b.genres).flat(Infinity))
  );
  return (
    <div>
      <h2>books</h2>
      {filter === "all" ? (
        "books filtered by all genres"
      ) : (
        <>
          {" "}
          books filtered by <b>{filter}</b> genre
        </>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter === "all"
            ? data.allBooks.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
            : data.allBooks
                .filter((b) => b.genres.includes(filter))
                .map((b) => {
                  return (
                    <tr key={b.id}>
                      <td>{b.title}</td>
                      <td>{b.author.name}</td>
                      <td>{b.published}</td>
                    </tr>
                  );
                })}
        </tbody>
      </table>
      {allGenres.map((g) => {
        return (
          <button onClick={() => changeFilter(g)} key={g}>
            {g}
          </button>
        );
      })}
      <button onClick={() => changeFilter("all")}>{"all genres"}</button>
    </div>
  );
};

export default Books;
