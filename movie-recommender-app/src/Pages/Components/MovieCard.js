// This is the movie card component
import { useState } from "react";
import Wishlist from "./Wishlist";
import "./styles/Card.css";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {

  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (movie) => {
    setWishlist((prevWishlist) => [...prevWishlist, movie]);
  };

  const currentMovie = movie.title;
  // opening the clicked movie
  const goToMovie = () => {
    navigate(`/search/${currentMovie}`);
    window.location.reload();
  };
  const img_path = "https://image.tmdb.org/t/p/w342";

  return (
    <div onClick={goToMovie} className="Main-Card">
      {movie.poster_path && (
        <img
          src={img_path + movie.poster_path}
          alt={movie.title}
          title={movie.title}
          className="Poster"
        />
      )}
      <div className="Movie-Title">{movie.title}</div>
      {movie.vote_average ? (
        <span className={"movie-voting"}>
          {movie.vote_average}
          <i class="fa fa-star" aria-hidden="true"></i>
          <button
          className="addToWishListBtn"
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(movie);
          }}
        >
          <i className="fa fa-star fa2star" aria-hidden="true"></i>
        </button>
        </span>
      ) : null}
    </div>
  );
};

export default MovieCard;
