import React from 'react';
import ReactDOM from 'react-dom';
import Courses from './components/Courses'

const App = ({ courses }) => {
  return (
    <div>
      <h1>Verkko tuotanto oppimäärä</h1>
      <Courses courses={courses}/>
    </div>
  )
}

const courses = [
  {
    name: 'Puoli Pino sovellus tuotanto',
    parts: [
      {
        name:'Reaktion perusteet', 
        exercises: 10,
        id: 1
      },
      {
        name:'Lavasteiden käyttö tiedon syöttämiseen', 
        exercises: 7,
        id: 2
      },
      {
        name:'Ainesosan valtio', 
        exercises: 14,
        id: 3
      }
    ]
  }, 
    {
      name: 'Solmu.js',
      parts: [
        {
          name: 'Reitittäminen',
          exercises: 3,
          id: 1
        },
        {
          name: 'Keskiastiasto',
          exercises: 7,
          id: 2
        }
      ]
    }
]

ReactDOM.render(<App courses={courses}/>, document.getElementById('root'));
