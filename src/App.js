import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "mohammad" }]);
  const [newName, setNewName] = useState("Enter name");

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    if (persons.find((person) => person.name === nameObject.name)) {
      alert(`${nameObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
    }
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
      {persons.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </div>
  );
};

export default App;
