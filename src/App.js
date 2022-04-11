import axios from "axios";
import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({});
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName.name,
      number: newName.number,
    };

    axios.post("http://localhost:3001/persons", nameObject).then((response) => {
      if (persons.find((person) => person.name === nameObject.name)) {
        alert(`${nameObject.name} is already added to phonebook`);
      } else {
        setPersons(persons.concat(response.data));
        setNewName("");
      }
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewName((values) => ({ ...values, [name]: value }));
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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
