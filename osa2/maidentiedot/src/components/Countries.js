import React, {useEffect} from 'react'
import axios from 'axios'

const Countries = ({ countries, filter, expand, setExpand, weather, setWeather}) => {
  const countriesToShow = filter === ''
    ? countries
    : expand !== ''
      ? countries.filter(country => country.name === expand)
      : countries
      .filter(country => country.name.toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase()))



  const rows = () => {
    if(filter === '' && expand !== '') (
      setExpand('')
    )

    if (countriesToShow.length === countries.length) {
      return(<p>Hae maata kirjoittamalla sen nimi englanniksi</p>)
    } else {
      if (countriesToShow.length > 10) {
        return(<p>Liian monta tulitikkua, erittele toinen suodatin</p>) 
      } else {
        if(countriesToShow.length === 1) {
          return(countriesToShow.map((c) => <FullCountry key={c.name} country={c} expand={expand} setExpand={setExpand} weather={weather} setWeather={setWeather}/>))
        } else {
          return(
            <table>
              <tbody>
                {countriesToShow.map((c) => <StubCountry key={c.name} country={c} setExpand={setExpand} expand={expand}/>)}
              </tbody>
            </table>
          )
        }
      }
    }
  }

  return (
    <div>
      {rows()}
    </div>
  )
}

const Button = (props) => {
  if (props.expand === '' && props.text === "Kutista") {
    return (<p></p>)
  } else {
    return (<button onClick={props.onClick}>{props.text}</button>)
  }
  
}

const StubCountry = ({ country, setExpand, expand}) => {
  return (
    <tr>
      <td>{country.name}</td>
      <td><Button onClick={() => setExpand(country.name)} text="Laajenna" expand = {expand}/></td>
    </tr>
  )
}

const FullCountry = ({ country, expand, setExpand, weather, setWeather}) => {
  

  const langs = () => country.languages
    .map((l) => <Language key={l.iso639_2} name={l.name}/>)
  
  return (
    <div>
      <h2>{country.name}</h2>  
      <table>
        <tbody>
          <tr><td>Pääkaupunki</td><td>{country.capital}</td></tr>
          <tr><td>Väkiluku</td><td>{country.population}</td></tr>
        </tbody>
      </table>
      <h3>Kielet</h3>
      <ul>
        {langs()}
      </ul>
      <img src={country.flag} alt="Lippu 404"/>
      <Weather city={country.capital} weather={weather} setWeather={setWeather}/>
      <br/>
      <Button onClick={() => setExpand('')} text="Kutista" expand={expand}/>
    </div>
  )
}

const Language = ({ name }) => {
  return (
    <li>{name}</li>
  )
}

const Weather = ({ city, weather, setWeather }) => {
    useEffect(() => {
      axios
        .get(`https://api.apixu.com/v1/current.json?key=e5e9db94df3b4963b1d114728190408&q=${city}&lang=fi`)
        .then(response => {
          setWeather(response.data.current)
        })
    }, [city, setWeather])

    if(typeof weather.condition !== 'undefined') {
      return (
        <div>
          <h3>Sää pääkaupungissa ({city})</h3>
    
          <p><b>Lämpötila: </b> {weather.temp_c} (tuntuu kuin {weather.feelslike_c}) Celsiusta</p>
          <p><b>Sää: </b>{weather.condition.text}</p>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }

}

export default Countries