import React from 'react';

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange, personService, setNotification}) => {
  
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(p => p.name).indexOf(newName) !== -1) {
      if (window.confirm(`${newName} löytyy jo luettelosta, korvataanko vanha numero uudella?`)) {
        personService
          .update(persons.filter(p => p.name === newName).map(p => p.id), personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          })
          .then( ree => {
            setNotification(['good', `Henkilön ${newName} numero päivitetty.`])
            setTimeout(() => {
              setNotification([null, null])
          }, 5000)})
      }
    } else {
      personService
        .create(personObject)
          .then(ret => {
            setPersons(persons.concat(ret))
            setNewName('');
            setNewNumber('');
          })
          .then( ree => {
            setNotification(['good', `Henkilö ${newName} luotu.`])
            setTimeout(() => {
              setNotification([null, null])
          }, 5000)})
    }
  }

  return (
    <form onSubmit={addPerson}>
    <div>nimi:
      <input value={newName} onChange={handleNameChange} /></div>
    <div>numero:
      <input value={newNumber} onChange={handleNumberChange} /></div>
    <div>
      <button type="submit">lisää</button></div>
    </form>
  )
}

export default PersonForm