import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import axios from "../API/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

const Row = ({ title, fetchUrl, id, addRating }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  //A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    console.log(id, fetchUrl);
    //if [], run once when the row loads, and dont run again

    async function fetchData() {
      //Dont move until we get the API answer
      const request = await axios.get(fetchUrl, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setMovies(request.data.result);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setModalVisibility(true);
    setMovieSelection(movie);
  };
  return (
    <section className="row">
      {/** TITLE */}
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            <ArrowBackIosIcon />
          </span>
        </div>
        <div id={id} className="row__posters">
          {/**SEVERAL ROW__POSTER */}
          {movies.map((movie, idx) => (
            <img
              key={idx}
              onClick={() => handleClick(movie)}
              className={`row__poster row__posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              loading="lazy"
              alt={movie.title}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            <ArrowForwardIosIcon />
          </span>
        </div>
      </div>
      {modalVisibility && (
        <MovieModal
          {...movieSelected}
          setModalVisibility={setModalVisibility}
          addRating={addRating}
        />
      )}
    </section>
  );
};

export default Row;
