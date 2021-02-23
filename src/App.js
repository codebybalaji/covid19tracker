import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import CustomMap from './Map';
import './App.css';
import Table from './Table';
import { sortData } from './Util';
import LineGraph from './LineGraph';


function App() {
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
  const [countries, setCountries] = useState([]); //hooks used as a variable 
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState({});
  // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  // const [mapZoom, setMapZoom] = useState(3);
  const [mapMarkerValues, setMapMakerValues] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
      console.log("countryInfo ",countryInfo );
    });

  

  }, []);


  // STATE = How to write a variable in React
  
  // USEEFFECT = Runs a piece of code based on a given condition
  useEffect(() => {
    // THe code inside here will run once when the component loads and not again
    //async - > send a request, wait for it, do something with it

    const getcountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        
        // console.log("countries data ",tableData);
        // console.log("data for countries data ",data);

        const mapCountriesLongAndLat = data.map((data) => ({
          coordinates :[
            data.countryInfo.long,
            data.countryInfo.lat
          ],
          name : data.country
        }));
        setMapMakerValues(mapCountriesLongAndLat);
        console.log( "mapMarkerValues",mapMarkerValues+" sadas ",mapCountriesLongAndLat)
      });
    };
    getcountriesData();
  }, []);

  const onCountryChange= async (event) => {
    const countryCode = event.target.value;

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[Country_code]
    const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      //All the data from the country response
      setCountryInfo(data);
    })

  };

  //console.log("country INfo ",countryInfo );

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        {/* Header */}
        {/* Title + Select input dropdown field */}
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country} >
          {/* Loop through all the countries and show a dropdown List all the option*/}
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
     
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      {/* InfoBoxes titles = "Coronavirus cases" */}
      {/* InfoBoxes titles = "Coronavirus recoveries| */}
      {/* InfoBoxes */}
      </div>
      {/* Map */}
      <CustomMap mapMarkerValues = {mapMarkerValues} />
      </div>
      <Card className="app_right">
      <CardContent>
        <h3>Live case by country</h3>
        <Table countries={tableData} />
        <h3>Worldwide new cases</h3>
        <LineGraph />
      </CardContent>
      </Card>
    </div>
  );
}

export default App;
