import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Content from "./Components/Content";
import Notification from "./Components/Notification";
import numberServices from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    numberServices
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((err) => alert(err));
  }, []);
  const notificationFactory = (status, text) => {
    return setNotification({ status, text });
  };
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      );

  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    if (newName === "" || newNumber === "") {
      notificationFactory(
        "error",
        `You have to enter name or number of the person you want to add`
      );
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      setNewName("");
      setNewNumber("");
    } else if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const personToUpd = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      if (
        window.confirm(
          `${personToUpd.name} is already in phonebook, do you wish to replace his number with new one?`
        )
      ) {
        const copy = { ...personToUpd, number: newNumber };
        numberServices
          .update(personToUpd.id, copy)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpd.id ? person : returnedPerson
              )
            );
            notificationFactory(
              "done",
              `Number of ${personToUpd.name} successfully updated`
            );
            setTimeout(() => {
              setNotification(null);
            }, 4000);
          })
          .catch((err) => {
            notificationFactory(
              "error",
              `Information of ${personToUpd.name} was deleted from server`
            );
            setPersons(
              persons.filter((person) => person.id !== personToUpd.id)
            );
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      numberServices
        .create(personObj)
        .then((res) => {
          setPersons(persons.concat(res));
          notificationFactory(
            "done",
            `${personObj.name} succesfully added to your phonebook`
          );
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch((err) => alert(err));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleChange2 = (e) => {
    setNewNumber(e.target.value);
  };
  const handleChange3 = (e) => {
    setNewFilter(e.target.value);
    if (newFilter) {
      setShowAll(false);
    }
  };
  const delById = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      numberServices
        .del(id)
        .then((res) => {
          setPersons(persons.filter((person) => person.id !== id));
          notificationFactory(
            "done",
            `${person.name} succesfully deleted from your phonebook`
          );
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch((err) => {
          notificationFactory(
            "error",
            `${person.name} already removed from your phonebook`
          );
          setTimeout(() => {
            setNotification(null);
          }, 4000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter onChange={handleChange3} />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleChange2={handleChange2}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Content personsToShow={personsToShow} handleDelete={delById} />
    </div>
  );
};
export default App;
