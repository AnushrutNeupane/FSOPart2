import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(()=>{
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })

  },[])

  // Adding Name logic
  const addName = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    const numberExists = persons.some((person) => person.number === newNumber);
    
    if (nameExists) {
      alert(`${newName} is already in the phonebook!`);
      return;
    }

    if (numberExists) {
      alert(`Someone is already added with the number ${newNumber}`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };
    
    personService.create(nameObject).then(returnedName => {
      setPersons(persons.concat(returnedName))
      setNewName("")
      setNewNumber("")
    })
    
    /*
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
    */
  };

  // Handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      }) 
    }
  }

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;