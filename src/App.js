import React, { useState } from 'react';
import './App.css';
import Chart from "react-google-charts";
import Header from './components/layout/Header';  
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Portfolio from './components/Portfolio';
//import './style.css';

function App() {
  const initWeather = []; //tulevia filtteröintejä varten
  const [weather, setWeather] = useState(initWeather);

 function convertUTCDateToLocalDate(date) {
  new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
  return date;
}
  let chartHumData = [
      ['Aika', '%',],
      ['Loading..', 0]
     ];
  let chartTempData = [
      ['Aika', 'Celsius'],
      ['Loading..', 0]
  ];
  fetch('https://oppilas-20.azurewebsites.net/api/HttpTriggerCSharp2?code=Pp4IjFueHvDz/TAbQ6Utb84svgjLa0/dko9NsadNwkKyTUbGWRNCwQ==&deviceId=250034001447393035313136&amount=10')
    .then(response => response.json())
    .then (json => setWeather([...json]));
  let humtempkey = 1;
  const rows = () => weather.map(temphum => { //loopataan uusimmat 10
    
    
    if(chartHumData[1][0] === 'Loading..'){
      chartHumData.pop();
    }
     if(chartTempData[1][0] === 'Loading..'){
      chartTempData.pop();
    }
      chartHumData.push([String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4], parseInt(temphum.Hum)])
      chartTempData.push([String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4], parseInt(temphum.Temp)])
    
    return <div key={humtempkey++}> 
    <b>Klo</b> {String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4]} <b>Lämpötila</b> {temphum.Temp}°C <b>Ilmankosteus</b> {temphum.Hum}% 
    </div>
    
  })

  return (
    <Router>
    <div className="App">
    <Header />
    <Switch>
      <Route path="/portfolio">
              <Portfolio />
      </Route>        
      <Route path= "/">
      
      {rows()}
      <div>
      <Chart
        width={1400}
        height={300}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={chartHumData}

        options={{
          title: 'Ilmankosteus',
          //chartArea: { width: '50%' },
          hAxis: {
            title: 'Kosteus %',
            minValue: 0,
          },
          
        }}
        legendToggle
        />
        </div>
        <div style={{ display: 'flex', }}>
          <Chart
        width={1400}
        height={300}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartTempData
        }
        options={{
          title: 'Lämpötila',
          hAxis: { title: 'Lämpötila °C', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          //chartArea: { width: '50%', height: '70%' },
          // lineWidth: 25
        }}
    />

  <a href="https://github.com/PenttilaTommi/S-AsemanK-ytt-liittym-/blob/master/README.md"   target= "_BLANK" rel= "noopener noreferrer" >Projektin README </a>
        </div>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
