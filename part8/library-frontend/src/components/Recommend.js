import React from "react";
import { gql, useQuery } from "@apollo/client";

const BOOKS_BY_GENRE = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;
const ME = gql`
  query {
    me {
      favouriteGenre
    }
  }
`;

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
