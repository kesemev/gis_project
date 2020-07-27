import React, { useState } from "react";
import "./PlaceSearch.css";
import GoogleApiConnect from "../../GoogleApiConnect";
import CandidateCard from "../CandidateCard/CandidateCard";
const PlaceSearch = () => {
  const [candidates, setCandidates] = useState([]);
  let timeout = 0;
  const searchForPlace = ({ target }) => {
    var searchText = target.value; // this is the search text
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      GoogleApiConnect.get("/get_places", {
        params: {
          input: searchText,
        },
      })
        .then((res) => setCandidates(res.data))
        .catch((e) => console.log(e.message));
    }, 500);
  };

  return (
    <div>
      <div className="ui input focus">
        <input
          type="text"
          placeholder="Enter Name of place"
          onChange={searchForPlace}
        />
      </div>
      <div className="items">
        {candidates.map((candidate, ind) => (
          <CandidateCard key={ind} place={candidate} />
        ))}
      </div>
    </div>
  );
};

export default PlaceSearch;
