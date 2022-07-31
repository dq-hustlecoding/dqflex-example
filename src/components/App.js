import React, { useEffect, useState } from "react";
import { baseUrl } from "../API/constants";
import requests from "../API/requests";
import "./App.css";
import Banner from "./Banner";
import Nav from "./Nav";
import Row from "./Row";

const App = () => {
  const [personalizeUrl, setPersonalizeUrl] = useState(baseUrl + "/all");
  const [myRating, setMyRating] = useState([]);

  const addRating = (rating) => {
    myRating.push(rating);
    setMyRating(myRating);
    const user_based_param = myRating.join("&params=");
    const url = `${baseUrl}/user-based/?params=${user_based_param}`;
    setPersonalizeUrl(url);
  };

  useEffect(() => {
    if (myRating.length > 0) {
      const user_based_param = myRating.join("&params=");
      const url = `${baseUrl}/user-based/?params=${user_based_param}`;
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  });

  return (
    <div className="app">
      {/**NAV */}
      <Nav />
      {/*BANNER*/}
      <Banner />

      <Row
        title="Recommend For You"
        id="RF"
        fetchUrl={personalizeUrl}
        addRating={addRating}
        key={personalizeUrl}
      />

      <Row
        title="DQ's Pick"
        id="DP"
        fetchUrl={requests.fetchDQsPick}
        addRating={addRating}
      />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        addRating={addRating}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
        addRating={addRating}
      />
      <Row
        title="Horror Movies"
        id="HM"
        fetchUrl={requests.fetchHorrorMovies}
        addRating={addRating}
      />
      <Row
        title="Romance  Movies"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
        addRating={addRating}
      />
    </div>
  );
};

export default App;
