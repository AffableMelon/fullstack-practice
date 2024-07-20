// import { useEffect, useState} from "react"
// import serverside from "../script/serverside"
import Content from './Content'
// const Countries = ({countries}) => {
    // // const countryData = []
    // const [countryData, setCountryData] = useState([])
    // // console.log(countries)
    // // if(countries.length === 1){
    //     console.log(countries)
    //     useEffect( () => {
    //         if (countries.length === 1){serverside.get('https://studies.cs.helsinki.fi/restcountries/api/name/' + countries[0]).then(
    //             r=> {
    //                 setCountryData( 
    //                     {
    //                         name: r.name.common,
    //                         capital: r.capital,
    //                         area: r.area,
    //                         flag: r.flags.png,
    //                         alt: r.flags.alt,
    //                     }
    //                 )
    //             }
                
    //         )
    //     }}, [])
    //     console.log(countryData)
    
    //     return(
    //         <div>
    //             {countryData.length !== 0 ? 
    //             console.log(countryData) : 
    //             countries.map( (country,  i) =>
    //                 {return(
    //                 <p key = {i}> {country} </p>
    //                 )}
                    
    //             )
    //         }
    //         </div>
        // )
        
        
 const Countries = ({countries, setCountries, setData, data}) => {
        if ((countries.length > 2 && countries.length < 15) || countries.length === 0) {
      return (
        <ul>
          {countries.map((country, i) =>
            <li key={i}> {country.name.common} <button onClick={() => setCountries([country])}>show</button></li>
          )}
        </ul>
      )
         } else if (countries.length === 1) {
      return (
        <Content country={countries[0]}/>
      )
  }
}
        
    
export default Countries             
    
    //     console.log(countryData)
    // // }
    // return (countries.map((country,i) => {
    //         console.log(country)
            
    //             <p key = {i}>{country}</p>
    //         )
    //     }))
    
    // return(
    //     <div className="country">
    //         <span className="Count_name">{text}</span>
            {/* <span className="number">{number}</span> */}
            {/* <button className= 'del' onClick={deleteHandler}>Delete</button> */}
        // </div>
    // ) //<p>{text} {number} <button onClick={deleteHandler}>delete</button></p>


