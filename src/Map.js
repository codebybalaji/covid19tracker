import React, { useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  // const 

const CustomMap = ( {mapMarkerValues} ) => {

  for(var i =0; i< mapMarkerValues.length; i++){
    console.log("inside the map js asda "+mapMarkerValues.name);    
  }
console.log("inside the map js "+mapMarkerValues+ "mapMarkerValues length ",mapMarkerValues.length);
{mapMarkerValues.map(({ name, coordinates }) => {
  console.log("name ",name, "\n coordinates ",coordinates.lat, " long ",coordinates.long);
})};
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {
          ({geographies}) => 
            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      {mapMarkerValues.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} name= {name} />
          <text
            textAnchor="middle"
            y={0}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {/* {name} */}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default CustomMap;
