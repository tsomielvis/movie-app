import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './styles/Wishlist.css'
import { Link } from "react-router-dom";


const Wishlist = ({ movies }) => {

  const apiKey = "api_key=43ced63edc709f31aa0d76ba4451e0d2";

  // const apiKey = "914180e8c3msh4756bc1d865af7fp101629jsn812eeb3481da";
  const [list, setList] = useState([]);
  const [homeGenreList, setHomeGenreList] = useState([{}]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currMovies, setCurrMovies] = useState([{}]);

  const renderMovies = () =>
    currMovies.map((movie) => {
      if (movie) {
        return (
          <MovieCard key={movie.id + movie.original_title} movie={movie} />
        );
      } else {
        return null;
      }
    });


  useEffect(() => {
    setCurrMovies([]);
    setSelectedGenres([...selectedGenres, 14, 10749]);
    setHomeGenreList([]);
    setList([]);
    //getting the list of all movies from our flask server for our searchbar
    fetch("/api/movies").then((Response) =>
      Response.json().then((data) => setList(data.arr))
    );
    // getting the list of all genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`).then(
      (Response) =>
        Response.json().then((data) => setHomeGenreList(data.genres))
    );
  }, []);
  useEffect(() => {
    setCurrMovies([]);
    if (selectedGenres.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}&release_date.lte=2019-12-12&with_genres=${encodeURI(
          selectedGenres.join(",")
        )}`
      ).then((Response) =>
        Response.json().then((data) => setCurrMovies(data.results))
      );
    }
  }, [selectedGenres]);
  {
    console.log(selectedGenres);
  }

  return (
    <div wishListMainContainer>

      <div className="  HomeMovies">
        <Link to="/home">
          <h2 className="wishListTitle">My Wishlist</h2>
        </Link>
        <div className="container HomeMovieGrid">
          {currMovies.length > 0 ? renderMovies() : null}
        </div>
      </div>

    </div>
  );
};

export default Wishlist;