import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const values = [bad, neutral, good]

  const handlers = [handleBadClick, handleNeutralClick, handleGoodClick]

  return (
    <div>
      <Content handlers={handlers} values={values}/>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Header header="anna syöttöselkä"/>
      <Buttons handlers={props.handlers}/>
      <Header header="tilastotikut"/>
      <Statistics values={props.values}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.header}</h2>
    </div>
  )
}

const Buttons = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <Button handleClick={props.handlers[0]} name="Paha"/>
            <Button handleClick={props.handlers[1]} name="Sävytön"/>
            <Button handleClick={props.handlers[2]} name="Hyvä"/>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <td>
      <button onClick={props.handleClick}>
        {props.name}
      </button>
    </td>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}


const Statistics = ({values}) => {
  const total = values.reduce((acc,cur) => acc+cur)
  const weight = (values[0]*(-1) + values[2])
  console.log({weight})

  if (total > 0) {
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text="Paha" value={values[0]}/>
            <StatisticLine text="Sävytön" value={values[1]}/>
            <StatisticLine text="Hyvä" value={values[2]}/>
            <StatisticLine text="Yhteensä" value={total}/>
            <StatisticLine text="Keskiarvo" value={weight / total}/>
            <StatisticLine text="Myönteinen" value={(values[2] / total) * 100 + " %"}/>
          </tbody>
        </table>
      </div>
    )
  } else {
  return (
    <div>
      <p>Syöttöselätön</p>
    </div>  
  )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
