import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, response] = useMutation(LOGIN);
  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (response.data) {
      const token = response.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setPage("books");
    }
  }, [response.data]);
  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log me In</button>
      </form>
    </div>
  );
};

export default LoginForm;
