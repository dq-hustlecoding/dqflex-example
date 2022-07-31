import CancelIcon from "@material-ui/icons/Cancel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import ReactStars from "react-stars";
import { baseUrl } from "../../API/constants";
import Row from "../Row";
import "./MovieModal.css";

const MovieModal = ({
  poster_path,
  movieId,
  title,
  genres,
  url,
  rating_avg,
  rating_count,
  setModalVisibility,
  addRating,
}) => {
  const onRating = (rating) => {
    const rating_with_id = `${movieId}:${rating}`;
    console.log(rating_with_id);
    addRating(rating_with_id);
    setModalVisibility(false);
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span
            onClick={() => setModalVisibility(false)}
            className="modal-close"
          >
            <CancelIcon />
          </span>
          <div className="modal__header">
            <img
              className="modal__poster-img"
              src={`${poster_path}`}
              alt={`${title}`}
            />
            <div className="modal__content">
              <p className="modal__details">
                <span className="modal__user-perc">Genre: </span>{" "}
                {genres.replaceAll("|", " | ")}
              </p>
              <h3 className="modal__title">{title}</h3>
              <p className="modal__overview">
                Vote Average: {rating_avg.toFixed(2)}
              </p>
              <p className="modal__overview">Vote Count: {rating_count}</p>
              <div className="modal__header">
                <button
                  className="banner__button play"
                  onClick={() => {
                    window.open(url);
                  }}
                >
                  <PlayArrowIcon />
                  Detail
                </button>
                <ReactStars
                  count={5}
                  onChange={onRating}
                  size={24}
                  color2={"#ffd700"}
                />
              </div>
            </div>
          </div>
          <Row
            title="You may also like..."
            id={movieId}
            fetchUrl={`${baseUrl}/item-based/${movieId}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
