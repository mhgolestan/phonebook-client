import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("Enter name");

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </label>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ol>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default App;
