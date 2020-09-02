import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState(null);
  const { data, loading } = useQuery(ALL_AUTHORS);

  const [editAuthor, result] = useMutation(EDIT_AUTHOR);
  const changeBirth = (event) => {
    event.preventDefault();
    editAuthor({
      variables: { name: name.value, setBornTo: Number(birthDate) },
    });

    setName(null);
    setBirthDate("");
  };
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setName("NO AUTHOR FOUND");
      setTimeout(() => {
        setName("");
      }, 2000);
    }
  }, [result.data]);

  if (!props.show || loading) {
    return null;
  }
  const selectOptions = data.allAuthors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={changeBirth}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={selectOptions}
            value={name}
          />
        </div>
        <div>
          born{" "}
          <input
            value={birthDate}
            onChange={({ target }) => setBirthDate(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
