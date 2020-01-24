import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Puoli Pino sovellus tuotanto',
    parts: [
      {
        name: 'Reaktion perusteet',
        exercises: 10
      },
      {
        name: 'Lavasteiden käyttö tiedon syöttämiseen',
        exercises: 7
      },
      {
        name: 'Ainesosan valtio',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Content course={course}/>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Header name={props.course.name}/>
      <Part part={props.course.parts[0]}/>
      <Part part={props.course.parts[1]}/>
      <Part part={props.course.parts[2]}/>
      <Total parts={props.course.parts}/>
      
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = ({part})=> {
  return (
    <div>
      <p>
        {part.name}: {part.exercises}
      </p>
    </div>
  )
}

const Total = ({parts}) => {
  const sum = parts
    .map(part => part.exercises)
    .reduce((acc, curr) => acc + curr)
  return (
    <div>
      <p>Tehtäviä yhteensä: {sum}</p>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))