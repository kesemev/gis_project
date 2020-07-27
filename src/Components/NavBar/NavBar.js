import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="ui three item menu">
      <Link to="/current_location" className="item">
        Current Location
      </Link>
      <Link to="/place_search" className="item">
        Place Search
      </Link>
      <Link to="/destination_arrival" className="item">
        Destination Arrival
      </Link>
    </div>
  );
};

export default NavBar;
