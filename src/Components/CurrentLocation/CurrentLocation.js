import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import MapMarker from "../MapMarker/MapMarker";

const CurrentLocation = ({ currentLocation }) => {
  return (
    <Map
      animate={true}
      viewport={{
        center: [currentLocation.latitude, currentLocation.longitude],
        zoom: 14,
      }}
      style={{
        width: "100%",
        height: "900px",
        zIndex: "10",
        position: "absolute",
      }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarker
        position={currentLocation}
        toolTipTitle="Current Location"
        onClick={() => console.log("Current Location")}
      />
    </Map>
  );
};

const mapStateToProps = ({ locationReducer }) => {
  return { currentLocation: locationReducer };
};

export default connect(mapStateToProps)(CurrentLocation);
