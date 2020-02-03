import React from 'react'

const Courses = ({ courses }) => {

  const cs = () => courses.map(c =>
    <Course
      key={c.name}
      course={c}
    />
  )
  
  return (
    <div>
      {cs()}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = (props) => (
  <h2>{props.course}</h2>
)

const Content = (props) => {
  
  const { parts } = props
  const rows = () => parts.map(part => 
    <Part
      key={part.id}
      part={part}
    />
  )

  return (
    <div>
      {rows()}
      <Total parts={props.parts}/>
    </div>
  )
}

const Part = ({ part }) => {
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

const Total = (props) => {
  const total = 
    props.parts
    .map(part => part.exercises)
    .reduce((acc, curr) => acc + curr)

  return (
    <div>
      <h3>Yhteensä {total}</h3>
    </div>
  )
}

export default Courses
