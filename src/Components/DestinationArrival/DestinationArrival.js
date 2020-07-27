import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "./DestinationArrival.css";
import MapMarker from "../MapMarker/MapMarker";
import { connect } from "react-redux";
import Routing from "../../RoutingMachine";

class DestinationArrival extends Component {
  state = {
    isMapInit: false,
    destination: null,
  };
  saveMap = (map) => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };

  render() {
    const { currentLocation } = this.props;
    const { destination, isMapInit } = this.state;

    return (
      <div className="map-container">
        <Map
          animate={true}
          viewport={{
            center: [currentLocation.latitude, currentLocation.longitude],
            zoom: 14,
          }}
          onclick={({ latlng }) => {
            const lat = latlng.lat;
            const lng = latlng.lng;
            this.setState({
              destination: { latitude: lat, longitude: lng },
            });
          }}
          style={{
            width: "100%",
            height: "900px",
            zIndex: "10",
            position: "absolute",
          }}
          ref={this.saveMap}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!destination ? (
            <MapMarker
              position={currentLocation}
              toolTipTitle="Current Location"
              onClick={() => console.log("Current Location")}
            />
          ) : null}

          {/* {destination ? (
            <MapMarker
              position={destination}
              toolTipTitle="Destination Location"
              onClick={() => console.log("Destination Location")}
            />
          ) : null} */}
          {isMapInit && destination && (
            <Routing
              map={this.map}
              source={currentLocation}
              destination={destination}
            />
          )}
        </Map>
        {!destination ? (
          <div className="over-text">
            <p>Tap To Select Destination</p>
          </div>
        ) : (
          <div className="over-text">
            <p>Drag the destination point</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ locationReducer }) => {
  return { currentLocation: locationReducer };
};

export default connect(mapStateToProps, {})(DestinationArrival);

// import React, { useState, useRef } from "react";
// import "./DestinationArrival.css";
// import { Map, TileLayer } from "react-leaflet";
// import { connect } from "react-redux";
// import MapMarker from "../MapMarker/MapMarker";
// import RoutingMachine from "../../RoutingMachine";

// const DestinationArrival = ({ currentLocation }) => {
//   const [destination, setDestination] = useState(null);
//   let map = useRef();

//   return (
//     <div className="map-container">
//       <Map
//         animate={true}
//         viewport={{
//           center: [currentLocation.latitude, currentLocation.longitude],
//           zoom: 14,
//         }}
//         onclick={({ latlng }) => {
//           const lat = latlng.lat;
//           const lng = latlng.lng;
//           setDestination({ latitude: lat, longitude: lng });
//         }}
//         style={{
//           width: "100%",
//           height: "900px",
//           zIndex: "10",
//           position: "absolute",
//         }}
//         ref={map}
//       >
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MapMarker
//           position={currentLocation}
//           toolTipTitle="Current Location"
//           onClick={() => console.log("Current Location")}
//         />
//         {destination ? (
//           <MapMarker
//             position={destination}
//             toolTipTitle="Destination Location"
//             onClick={() => console.log("Current Location")}
//           />
//         ) : null}
//         {map.current !== undefined ? <RoutingMachine map={map} /> : null}
//       </Map>
//       {!destination ? (
//         <div className="over-text">
//           <p>Tap To Select Destination</p>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// const mapStateToProps = ({ locationReducer }) => {
//   return { currentLocation: locationReducer };
// };

// export default connect(mapStateToProps, {})(DestinationArrival);
