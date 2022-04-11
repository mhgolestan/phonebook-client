// import Person from "./Person";

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        // <Person id={person.id} name={person.name} number={person.number} />
        <li key={person.id}>
          {person.name} {person.number}
          {<button onClick={() => handleDelete(person.id)}> remove</button>}
        </li>
      ))}
    </div>
  );
};

export default Persons;
