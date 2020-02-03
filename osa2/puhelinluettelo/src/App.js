import React, { useState, useEffect } from 'react'
import Person from './components/Person';
import FilterForm from './components/FilterForm';
import PersonForm from './components/PersonForm';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const [notification, setNotification] = useState([null, null])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  
  useEffect(() => {
    console.log('wallis')
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })

  }, [])
  console.log('render', persons.length, 'persons');

  const personsToShow = newFilter === ('')
    ? persons
    : persons
      .filter(person => person.name.toLocaleLowerCase()
        .startsWith(newFilter.toLocaleLowerCase()));
        
  const rows = () => personsToShow.map((p) => <Person key={p.name} person={p} deletePerson={deletePerson}/>);

  const deletePerson = (id) => {
    const name = persons.filter(p => p.id === id).map(p => p.name)
    if (window.confirm(`Poistetaanko ${name} elämästä?`)) {
      personService.deletus(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .then( ree => {
        setNotification(['good', `Henkilö ${name} poistettu.`])
        setTimeout(() => {
          setNotification([null, null])
      }, 5000)})
      .catch(error => {
        setNotification(['bad', `Henkilö ${name} ei ole enää olemassa.`])
        setTimeout(() => {
          setNotification([null, null])
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification type={notification[0]} message={notification[1]}/>

      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Lisää uusi henkilö</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} personService={personService} setNotification={setNotification}/>
      <h2>Henkilöt</h2>
      
      <table>
        <tbody>
          <tr>
            <th>Nimi</th>
            <th>Numero</th>
          </tr>
          {rows()}
        </tbody>
      </table>

      

    </div>
  )
}

const Notification = ({ message, type}) => {
  if (message === null) {
    return null
  }

  if (type === "good") {
    return (
      <div >
        <p className="good notification">{message}</p>
        
      </div>
    )
  } else {
    return (
      <div className="bad notification">
        {message}
      </div>
    )
  }
  
}

export default App