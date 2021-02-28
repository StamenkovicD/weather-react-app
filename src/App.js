import React, { useState } from 'react';
import './App.css';

function App() {
  const api = {
    key: '054e4677df0ce86f3e529448afa9e192',
    base: 'https://api.openweathermap.org/data/2.5/'
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async evt => {
    if(evt.key === "Enter") {
      const resApi = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      const results = await resApi.json();
      setWeather(results);
      setQuery(''); 


      // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      // .then(res => res.json())
      // .then(result => {
      //   setWeather(result);
      //   setQuery('');
      //   console.log(weather);
      // });
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'Narch', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}. ${month} ${year}`;
    
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
       <main>
         <div className="search-box">
           <input
           type="text"
           className="search-bar"
           placeholder="Search.."
           onChange={e => setQuery(e.target.value)}
           value={query}
           onKeyPress={search}
           />
         </div>
         {(typeof weather.main != "undefined") ? (
           <div>
          <div className="location-box">
            <div className='location'>{weather.name}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
          </div>
         ) : ('') }
       </main>
    </div>
  );
}

export default App;
