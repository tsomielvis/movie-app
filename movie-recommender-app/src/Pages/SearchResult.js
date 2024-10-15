import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Components/styles/SearchResultsStyles.css";
import MovieCard from "./Components/MovieCard";
import NavBar from "./Components/NavBar";
import ReactPlayer from "react-player";
import Footer from "./Components/Footer";
import Wishlist from "./Components/Wishlist";
import BarChart from "./Components/BarChart";

import { Bar, Line } from "react-chartjs-2";

const SearchResult = () => {
  const params = useParams();
  const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
  const inputValue = params.id; // retrieving the searched movie name
  const [searchedMovie, setSearchedMovie] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([{}]);
  const [castMembers, setCastMembers] = useState([{}]);
  const [genreList, setGenreList] = useState([{}]);
  const [currGenre, setCurrGenre] = useState([{}]);
  const [videoData, setVideoData] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [addMovie, setAddMovie] = useState([]);
  const [addToList, setAddToList] = useState(true);
  const [isCopied, setIsCopied] = useState(true);
  const gotCast = (castData) => {
    setCastMembers([]);

    let counter = 5;
    for (let cast of castData) {
      setCastMembers((castMembers) => [...castMembers, cast]);
      counter--;
      if (counter === 0) break;
    }
  };
  const gotVideo = (data) => {
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );

      setVideoData(trailer ? trailer : data.videos.results[0]);
    }
  };

  const gotRecommendedData = (apiData) => {
    setRecommendedMovies([]);
    let counter = 16;
    // getting data for each of the recommened movies
    for (let movie of apiData.movies) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`
      ).then((Response) =>
        Response.json().then((data) =>
          setRecommendedMovies((recommendedMovies) => [
            ...recommendedMovies,
            data.results[0],
          ])
        )
      );
      counter--;
      if (counter === 0) break;
    }
  };

  useEffect(
    () => {
      const gotTMDBData = (apiData) => {
        const realMovieData = apiData.results[0];
        setCurrGenre([]);
        setCurrGenre(realMovieData.genre_ids);

        setSearchedMovie(realMovieData);
        fetch(
          `https://api.themoviedb.org/3/movie/${realMovieData.id}/credits?${apiKey}`
        ).then((Response) =>
          Response.json().then((data) => gotCast(data.cast))
        );

        fetch(
          `https://api.themoviedb.org/3/movie/${realMovieData.id}?${apiKey}&append_to_response=videos`
        ).then((Response) => Response.json().then((data) => gotVideo(data)));
      };
      // getting data for the movie from tmdb
      fetch(
        `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${inputValue}`
      ).then((Response) => Response.json().then((data) => gotTMDBData(data)));
      // getting list of movie from our flask server
      fetch(`/api/similarity/${inputValue}`).then((Response) =>
        Response.json().then((data) => gotRecommendedData(data))
      );
      // getting the list of all genres
      fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`).then(
        (Response) => Response.json().then((data) => setGenreList(data.genres))
      );
    },
    [inputValue] /*Making api call whenever the searched movie changes */
  );

  const RenderMovies = () =>
    recommendedMovies.map((movie) => {
      if (movie) {
        return (
          <MovieCard key={movie.id + movie.original_title} movie={movie} />
        );
      } else {
        return null;
      }
    });
  const RenderTrailer = () => {
    return (
      <div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoData.key}-U`}
          playing={true}
          width="100%"
          height="100%"
          controls={true}
          className="youtube-container"
        />
      </div>
    );
  };
  const displayGenre = () =>
    currGenre.map((movieId, ind) => {
      if (ind >= 3) return null;
      if (movieId) {
        for (let obj of genreList) {
          if (obj.id === movieId) {
            if (ind === 2) {
              return <span>{obj.name}</span>;
            } else {
              return (
                <span>
                  {obj.name}
                  {","}{" "}
                </span>
              );
            }
          }
        }
      } else {
        return null;
      }
      return null;
    });

  const handleClick = () => {
    if (addToList) {
      alert("Added to Wishlist");
    } else {
      alert("Removed from list");
    }
    setAddToList(!addToList);
    <Wishlist searchedMovie={addMovie} />;
  };

  const handleCopyClick = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("URL copied to clipboard!");
        setIsCopied(!isCopied);
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };

  const imgLink = "https://image.tmdb.org/t/p/original";
  const backdropPath = "https://image.tmdb.org/t/p/w1280";

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${backdropPath}${searchedMovie.backdrop_path})`,
      }}
      className="MainBackGround"
    >
      <NavBar isHome={true} />

      <div className="container trailerContainer">
        {
          videoData && playTrailer
            ? RenderTrailer()
            : null /*Rendering the trailer*/
        }
        <div className="container .movie-details">
          <div className="row ">
            <div className="col-md-6 left-box col-md-push-6">
              <h1 className="topTitle-Movie">{searchedMovie.title} </h1>

              <p className="overviewContent">{searchedMovie.overview}</p>
              <p className="castTitle">Cast: </p>
              <div className="casting">
                {castMembers.map((member) => {
                  if (member) {
                    return (
                      <a
                        href={` https://en.wikipedia.org/wiki/${member.name}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <img
                          key={JSON.stringify(member.cast_id + member.id)}
                          src={
                            member.profile_path
                              ? `${imgLink}${member.profile_path}`
                              : ""
                          }
                          title={member.name}
                          alt="mainPhoto"
                        />
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="shareBtnAndDetail">
                <div className="detailOfMovie">
                  <div>
                    <b>Rating{" : "}</b>
                    {searchedMovie.vote_average}
                    {"/10 "}

                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div>
                    <b> Release Date </b>
                    {" : "} {searchedMovie.release_date}
                  </div>
                  <div>
                    <b>Genres</b>
                    {" : "}
                    {currGenre ? displayGenre() : null}
                  </div>
                </div>

                <div>
                  <button
                    className={isCopied ? "copyBtn" : "copiedBtn"}
                    onClick={handleCopyClick}
                  >
                    {isCopied ? (
                      <i className="fa-solid fa-copy"> </i>
                    ) : (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="btnsbar1">
                <div>
                  <button
                    className="trailer-bttn"
                    onClick={() => setPlayTrailer(!playTrailer)}
                  >
                    <i className="fa-solid fa-play"></i>
                    {" Watch Trailer"}
                  </button>
                </div>
                <div>
                  <button
                    className={addToList ? "addingBtn" : "addedBtn"}
                    onClick={handleClick}
                  >
                    {addToList ? (
                      <i className="fa-solid fa-plus"> Add to List </i>
                    ) : (
                      <i className="fa-solid fa-check"> Added</i>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-md-pull-6 text-center">
              <img
                className="main-img"
                src={`https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`}
                alt="Movie"
              />
            </div>
          </div>
        </div>
      </div>
      {/*Trailer Close Button */}
      <div className={playTrailer ? "DisplayOn" : "DisplayOFF"}>
        <button className="close-bttn" onClick={() => setPlayTrailer(false)}>
          Close Trailer
        </button>
      </div>

      <div className="reviewContainer">
        <h3>Reviews</h3>
        <br />
        <div className="indiReview">
          <p>
            <span>Chris Fox</span>
          </p>
          <p>Really great movie</p>
        </div>
        <div className="indiReview">
          <p>
            <span>Aniz</span>
          </p>
          <p>Gooid.</p>
        </div>
        <div className="indiReview">
          <p>
            <span>SSW</span>
          </p>
          <p>Really loved the artowrk and in love</p>
        </div>
      </div>
      <BarChart searchedMovie={searchedMovie} />

      <div className="container-fluid recommendedMovies">
        <h2 className=" container RecommendHeading">Recommended Movies</h2>
        {/*Rendering the recommended movie cards */}
        <div className="container recommendedGrid">{RenderMovies()}</div>
      </div>
      <div></div>
      {/* <Footer /> */}
    </div>
  );
};

export default SearchResult;
