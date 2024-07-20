import axios from 'axios'
import serverside from '../script/serverside'
import Header from './Header'
import {useState, useEffect} from 'react'

const Content = (p) => {
    console.log(p)
    const weatherApi = import.meta.env.VITE_WEATHER_KEY
    // const time = Date().getTime()
    const [weather, setWeather] = useState([])
    const [lat, long] = [p.country.latlng[0], p.country.latlng[1]]

    // useEffect( () => {
    //     const weather = async () => {
    //         const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/timemachine`, {
    //             params: {
    //               lat,
    //               lon: long,
    //               dt: Math.floor(Date.now() / 1000), // Current timestamp for historical data
    //               appid: weatherApi,
    //             },
    //           });
    //           setWeather(response.data);
    //     }
    //     weather()
    // }, [lat, long, weatherApi]) needs mooney


    useEffect ( ()=> {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m`


        serverside.get(url).then(
            r => {setWeather(r.current)
            // console.log(r)
            }
        )
    }, [])

    console.log(weather)
    return(
        <div>
            <Header title = {p.country.name.common} />
            <p>capital: {p.country.capital}</p>
            <p>area: {p.country.area}</p>
            <img src={p.country.flags.png} alt={p.country.flags.alt}></img>
            <Header title = {'Weather in ' + p.country.capital} />
            <p>Tempreature: {weather.temperature_2m} C</p>
            <p>Wind speed: {weather.wind_speed_10m} m/s</p>
            

        </div>
    )

}

export default Content