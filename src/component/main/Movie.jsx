import React from "react";
import Edit from "../../assets/images/edit.svg";

const Movie = (props) => {
  let movie = props.movie || {};
  return (
    <div className="movie_outer">
      <div className="movie_poster">
        <img className="movie_poster_img" src={movie.poster} />
        <div className="edit_img_outer">
          <img
            src={Edit}
            className="edit_img"
            onClick={() => props.handleEdit()}
          />
        </div>
      </div>
      <div className="movie_info">
        <h3 className="movie_title">{movie.title}</h3>
        <p className="publishing_year mb-0">{movie.publishingYear}</p>
      </div>
    </div>
  );
};

export default Movie;
