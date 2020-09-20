import React from "react";
import { useQuery } from "@apollo/client";
import { ME, BOOKS_BY_GENRE } from "../queries";

const Recommend = ({ show }) => {
  const { data, loading } = useQuery(ME);
  const genre = loading ? null : data.me.favouriteGenre;

  const booksByGenre = useQuery(BOOKS_BY_GENRE, { variables: { genre } });

  if (!show || loading) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      {`suggested books by your favourite genre: ${genre} `}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.data.allBooks.map((b) => {
            return (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
