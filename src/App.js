import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CurrentLocation from "./Components/CurrentLocation/CurrentLocation";
import { updateLocation } from "./Redux/Actions";
import DestinationArrival from "./Components/DestinationArrival/DestinationArrival";
import PlaceSearch from "./Components/PlaceSearch/PlaceSearch";

function App({ updateLocation }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [updateLocation]);

  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
        <NavBar />
        <Switch>
          <Route
            path="/"
            render={() => {
              return <Redirect to={{ pathname: "/current_location" }} />;
            }}
            exact
          />
          <Route path="/current_location" exact>
            <CurrentLocation />
          </Route>
          <Route path="/place_search" exact>
            <PlaceSearch />
          </Route>
          <Route path="/destination_arrival" exact>
            <DestinationArrival />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, { updateLocation })(App);
