import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div>
      <div className="table">
        <div className="heading">Active Covid-19 Cases</div>
        {countries.map((country) => (
          <tr>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country.cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Table
