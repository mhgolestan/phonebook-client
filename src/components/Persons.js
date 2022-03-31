const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default Persons;
