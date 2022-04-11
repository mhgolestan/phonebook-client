// import Person from "./Person";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        // <Person id={person.id} name={person.name} number={person.number} />
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default Persons;
