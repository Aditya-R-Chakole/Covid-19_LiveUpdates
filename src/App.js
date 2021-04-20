import React, { useState, useEffect } from "react";
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
import numeral from "numeral";
import './App.css';

import Infobox from './components/infobox/Infobox';
import Table from './components/table/Table';
import Map from './components/map/Map';
import "leaflet/dist/leaflet.css";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 20.5937, lng: 78.9629});
  const [infoData, setInfoData] = useState({});
  const [casesType, setCasesType] = useState("cases");

  const sortTheData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b)=>( (a.cases > b.cases)?(-1):(1) ) );
    return sortedData;
  }

  useEffect(() => {
    const initializeData = async() => {
      await fetch("https://disease.sh/v3/covid-19/all")
      .then((response)=>(response.json()))
      .then((data)=>{
        setInfoData(data);
        console.log(data);
      })
    };
    initializeData();
  }, []);

  useEffect (() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            label: country.country,
            value: country.countryInfo.iso2,
          }));
          const dataList = data.map((country)=>({
            country: country.country,
            cases: country.cases,
          })); 
          setCountryData(data);
          setCountries(countries);
          setTableData(sortTheData(dataList));
          console.log("QWERTY", tableData);
        });
    };
    getCountriesData();
    console.log("ASDFG", tableData);
  }, []);

  const countryChange = async (e) => {
    const countryCode = e.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInfoData(data);
        console.log(data);
      });
  };

  const printSyntex = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

  return (
    <div>
      <div className="navBar">
        <div className="dropdown">
          <Dropdown
            name="Countries"
            title="Worldwide"
            list={countries}
            searchable={["Search for location", "No matching location"]}
            onChange={(e)=>{countryChange(e)}}
          />
        </div>
        <div className="appTitle"><b>Covid-19</b> Live Updates</div>
      </div>
      <div className="app">
        <div className="app__left">
          <Infobox 
            title={"Active cases"}
            number={printSyntex(infoData.todayCases)}
            total={numeral(infoData.active).format("0.0000a")}
            color={"#B80C3F"}
            onClick={(e)=>{setCasesType("cases")}}
            ifActive={(casesType === "cases")?(1):(0)}/> 
          <Infobox 
            title={"Recovered"}
            number={printSyntex(infoData.todayRecovered)}
            total={numeral(infoData.recovered).format("0.0000a")}
            color={"#48A14D"}
            onClick={(e)=>{setCasesType("recovered")}}
            ifActive={(casesType === "recovered")?(1):(0)}/> 
          <Infobox 
            title={"Deaths"}
            number={printSyntex(infoData.todayDeaths)}
            total={numeral(infoData.deaths).format("0.0000a")}
            color={"#B80C3F"}
            onClick={(e)=>{setCasesType("deaths")}}
            ifActive={(casesType === "deaths")?(1):(0)}/> 

          <Table countries={tableData} />
        </div>
        <div className="app__right">
          <Map 
            countryData = {countryData}
            casesType = {casesType}
            mapCenter = {mapCenter}/>
        </div>
      </div>
    </div>
  );
}

export default App;
