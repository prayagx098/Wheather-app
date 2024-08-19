import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css'
import Header from './Header'
import { MDBContainer,
  MDBInputGroup
 } from 'mdb-react-ui-kit';
import Report from './components/Report';
import { useState } from 'react';
import { SearchResults } from './components/SearchResults';
import LocationResult from './components/LocationResult';


function App() {

  const[input,setInput] = useState("");

  const [results,setResults] = useState([]);

  const [weatherData, setWeatherData] = useState(null); 

  const fetchData = (value) => {

    fetch("./src/data/city.json")
    .then((response) => response.json())
    .then(json => {
      const results = json.filter((city)=>{
        return city && city.name && city.name.toLowerCase().includes(value);
      });
      setResults(results);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      
  }

  const changeInputValue = (value) => {
    setInput(value);
    if (value === "") {
      setResults([]); 
    } else {
      fetchData(value);
    }
  }

  const fetchWeather = (cityName) => {
    const apiKey = '1bf7ce9527a44632ab7190306241608';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(`fetched Data ${cityName}:`, data);
        setWeatherData(data);
        setInput("");
        setResults([]); 
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  return (
    <>
      <Header/>
      <div className="content">
      <div className='grid'>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
          <MDBContainer className="mt-5 p-1 textbar bg-gradient text-white absolute">
              <MDBInputGroup size='lg' textBefore='&#x1F50D;'>
                <input 
                className='form-control' 
                style={{borderRadius:'80px'}} 
                type='text' 
                placeholder='Enter City to get weather...'
                value={input}
                onChange={(e) => changeInputValue(e.target.value)}
                />
              </MDBInputGroup>
          </MDBContainer>
          <SearchResults results = {results} onSelectCity={fetchWeather}/>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-12 col-md-1"></div>
          <div className='col-12 col-md-5 mb-3'>
            <MDBContainer className="p-3 mt-5 container1 text-white rounded-5">
              <h6 className='text-dark'>Current Location</h6>
              <Report/>
            </MDBContainer>
          </div>
          <div className='col-12 col-md-5'>
            <MDBContainer className="p-3 mt-5 container1 text-white rounded-5">
              <h6 className='text-dark'>Searched Location:</h6>
              <LocationResult weatherData={ weatherData }/>
            </MDBContainer>
          </div>
          <div className="col-12 col-md-1"></div>
        </div>
      </div>
      </div>


      


    </>
  )
}

export default App
