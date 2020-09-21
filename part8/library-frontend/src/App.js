import React, { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { ME } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [fetchRecomendations, setFetchRecomendations] = useState(false);
  const client = useApolloClient();
  const fetchUser = useQuery(ME);
  const user = !fetchUser.loading ? fetchUser.data.me : null;

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };
  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors show={page === "authors"} token={token} />

        <Books show={page === "books"} />
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setPage={setPage}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button
          onClick={() => {
            setPage("recommend");
            setFetchRecomendations(true);
          }}>
          recommendations
        </button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommend
        show={page === "recommend"}
        user={user}
        fetchRecomendations={fetchRecomendations}
        setFetchRecomendations={setFetchRecomendations}
      />
    </div>
  );
};

export default App;
