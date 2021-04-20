import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";

const casesTypeColors = {
  cases: {
    hex: "#4056a1",
    multiplier: 400,
  },
  recovered: {
    hex: "#4056a1",
    multiplier: 600,
  },
  deaths: {
    hex: "#4056a1",
    multiplier: 2000,
  },
};

const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.2}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">
            {country.country}
          </div>
          <div className="info-confirmed">
            Cases:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));


function Map(props) {
  return (
    <div className="map">
      <LeafletMap center={props.mapCenter} zoom={3}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(props.countryData, props.casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
