import { useState, useEffect } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import serverSide from './script/serverside'
import Countries from './components/Countries'
import { all } from 'axios'
import Content from './components/Content'

function App() {
  const [filter, setFilter] = useState(null)
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [data, setData] = useState([])

 useEffect(() => {
    serverSide.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(
      (p) => {
        // console.log(p)
        const countryies = p.map((p) => { return((p))})
        console.log(countryies)
        setAllCountries(countryies)
      }
    )
  }, [])
    



  const filterizer  = (e) => {
    console.log(e.target.value)
    setFilter((e.target.value))


    if (filter) {
      // allCountries.forEach(c => {console.log(c)})

      const filt = allCountries.filter(country => {
        // console.log(country.name.common) 
        return(country.name.common
          .toLowerCase()
          .includes(filter))
    })

    console.log(filt)
    setCountries(filt)
    }
  }

  return (
    <div>
    <Header title = 'Countries' />
    <Form 
      onSubHandler = {(e) => {e.preventDefault()}} 
      onCHandler = {filterizer}
      text = 'find country'
      />
      <Countries countries = {countries} setCountries={setCountries} />
      {
      // countries.length <= 20 && countries.length !== 0 ?  
      // <Countries countries={countries} setCountries={retrieveData} /> : <p>nothing found</p>
      // countries.map((country, i) => {return(<Countries text = {country} key= {i} />) }): <Countries text = 'Nothing found or too much found' />
      } 
      
    
    </div>
  )
}

export default App
