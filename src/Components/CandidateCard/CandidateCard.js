import "./CandidateCard.css";
import React, { useState, useEffect, useRef } from "react";
import GoogleApiConnect from "../../GoogleApiConnect";

const CandidateCard = ({ place }) => {
  const [imageLink, setImageLink] = useState("");
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getPhoto(place);
  }, [place]);

  const getPhoto = async (place) => {
    if (place.hasOwnProperty("photos")) {
      let photoReference = place.photos[0].photo_reference;
      let response = await GoogleApiConnect.get(`/${photoReference}`);
      if (componentIsMounted.current) {
        setImageLink(response.data);
      }
      return;
    }
    setImageLink("No Image");
  };

  const checkOpennings = (place) => {
    let placeStatus = {};
    if (place.hasOwnProperty("opening_hours")) {
      placeStatus = place.opening_hours.open_now
        ? { status: "Open", color: "green" }
        : { status: "Closed", color: "red" };
    } else {
      return null;
    }
    return (
      <div className={`ui horizontal ${placeStatus.color} label`}>
        {placeStatus.status}
      </div>
    );
  };

  return (
    <div className="card-item">
      <div className="image">
        <img alt="Place" src={imageLink} />
      </div>
      <div className="content">
        <div className="header">
          {place.name} {checkOpennings(place)}
        </div>
        <div>
          <span>{place.vicinity}</span>
        </div>
        <div className="stars">{place.rating} stars</div>
      </div>
    </div>
  );
};

export default CandidateCard;
