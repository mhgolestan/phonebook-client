import { useEffect, useState } from "react";

import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({});
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    personsServices.getAll().then((initialPersosns) => {
      setPersons(initialPersosns);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName.name,
      number: newName.number,
    };

    const existedPerson = persons.find(
      (person) => person.name === nameObject.name
    );

    if (existedPerson) {
      let isExecuted = window.confirm(
        `${existedPerson.name} exists. Do you want to replace it?`
      );
      if (isExecuted) {
        axios
          .put(`http://localhost:3001/persons/${existedPerson.id}`, nameObject)
          .then((response) => {
            const personsCopy = [...persons];
            const existedPersonIndex = personsCopy.indexOf(existedPerson);
            personsCopy[existedPersonIndex] = response.data;
            setPersons(personsCopy);
          });
      }
    } else {
      personsServices.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
      });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewName((values) => ({ ...values, [name]: value }));
  };

  const handleDelete = (id) => {
    let isExecuted = window.confirm("Are you sure?");
    if (isExecuted) {
      personsServices.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleSearch = (event) => {
    const search = event.target.value;
    setSearchResult(search);
  };

  const personsToShow =
    searchResult === ""
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().includes(searchResult.toLowerCase());
        });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} searchResult={searchResult} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        name={newName.name}
        number={newName.number}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
