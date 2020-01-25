import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  const [popI, setPopI] = useState(0)
  
  const newNumber = () => {
    const nu = Math.floor(props.anecdotes.length * Math.random())
    if (nu !== selected) {
      return nu  
    } else {
      return newNumber()
    }
  }
  
  const select = () => {
    console.log("klik")
    setSelected(newNumber)
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    if (votes[selected] >= votes[popI]) {
      setPopI(selected)
    }

    console.log(newVotes)
    setVotes(newVotes)
  }

  return (
    <div>
      <Content selected={selected} anecdotes={props.anecdotes} select={select} vote={vote} votes={votes} popI={popI}/>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Anecdote header="Päivän mietelause" anecdote={props.anecdotes[props.selected]} votes={props.votes[props.selected]}/>
      <Buttons select={props.select} vote={props.vote}/>
      <Anecdote header="Useimpien äänten mietelause" anecdote={props.anecdotes[props.popI]} votes={props.votes[props.popI]}/>

    </div>
  )
}

const Anecdote = ({anecdote, votes, header}) => {
  return (
    <div>
      <h2>{header}</h2>
      <p>{anecdote}</p>
      <p>Omistaa {votes} ääntä</p>
    </div>
  )
}

const Buttons = (props) => {
  console.log(props)
  return (
    <table>
      <tbody>
        <tr>
          <Button text="Uusi mietelause" action={props.select} />
          <Button text="Äänestä" action={props.vote}/>
        </tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  console.log(props)
  return (
  <td>
    <button onClick={props.action}>
      {props.text}
    </button>
  </td>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)