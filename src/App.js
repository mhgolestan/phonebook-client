import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "mohammad", phone: 1234, id: 1 },
  ]);
  const [newName, setNewName] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName.name,
      phone: newName.phone,
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

  return (
    <div>
      <h2>Phonebook</h2>
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
            name="phone"
            value={newName.phone || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.phone}
        </li>
      ))}
    </div>
  );
};

export default App;
