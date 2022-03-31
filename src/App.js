import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState({});
  const [searchResult, setSearchResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName.name,
      number: newName.number,
      id: persons.length + 1,
    };

    if (persons.find((person) => person.name === nameObject.name)) {
      alert(`${nameObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewName((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = (event) => {
    const search = event.target.value;
    setSearchResult(search);
    // console.log(search);
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

      <form>
        <label>
          Search: {""}
          <input
            type="text"
            name="search"
            value={searchResult}
            onChange={handleSearch}
          ></input>
        </label>
      </form>

      <form onSubmit={handleSubmit}>
        <label>
          Enter name:{" "}
          <input
            type="text"
            name="name"
            value={newName.name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter phone number: {""}
          number:{" "}
          <input
            type="number"
            name="number"
            value={newName.number || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default App;
