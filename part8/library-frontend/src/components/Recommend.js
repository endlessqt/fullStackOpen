import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";

const Recommend = ({ show, user }) => {
  const genre = user ? user.favouriteGenre : null;
  const [getBooksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });
  useEffect(() => {
    if (user) {
      getBooksByGenre();
    }
  }, [result.data, user, getBooksByGenre]);

  if (!show) {
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
          {result.data.allBooks.map((b) => {
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
