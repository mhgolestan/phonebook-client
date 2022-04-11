import { useEffect, useState } from "react";

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

    personsServices.create(nameObject).then((returnedPerson) => {
      if (persons.find((person) => person.name === nameObject.name)) {
        alert(`${nameObject.name} is already added to phonebook`);
      } else {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
      }
    });
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
