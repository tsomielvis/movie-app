import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Components/styles/HomeStyles.css";
import MovieCard from "./Components/MovieCard";
import { useEffect, useState } from "react";

const Home = () => {
  const apiKey = "api_key=43ced63edc709f31aa0d76ba4451e0d2";
 
  // const apiKey = "914180e8c3msh4756bc1d865af7fp101629jsn812eeb3481da";
  const [list, setList] = useState([]);
  const [homeGenreList, setHomeGenreList] = useState([{}]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currMovies, setCurrMovies] = useState([{}]);

  const [visibility, setVisibility] = useState(true);

  const [mood, setMood] = useState("");
  const [menu, setMenu] = useState("");

  useEffect(() => {
    setCurrMovies([]);
    setSelectedGenres([]);
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

  const onTagClick = (genreId) => {
    let isPresent = false;
    // to check if th genre exist
    for (let id of selectedGenres) {
      if (id === genreId) {
        isPresent = true;
        break;
      }
    }
    if (isPresent) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genreId));
    } else {
      setSelectedGenres((selectedGenres) => [...selectedGenres, genreId]);
    }
  };
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

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const getRecommendedMovies = () => {
    // Make a POST request to the Flask server with the user's mood
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: mood }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the current movies with the recommended movies
        setCurrMovies(data.movies);
      });
  };
  const clearSelectedGenres = () => {
    setSelectedGenres([]);
  };
  const handleClearGenres = () => {
    setSelectedGenres([]);
  };

  const displayMenu = () => {
    // setVisibility(false)
    if (mood === "Happy") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 9648, 12]);
      getRecommendedMovies();
    } else if (mood === "Relaxed") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 10751, 9648]);
      getRecommendedMovies();
    } else if (mood === "Sad") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 35, 10770]);
      getRecommendedMovies();
    } else if (mood === "Angry") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 10402]);
      getRecommendedMovies();
    } else if (mood === "Excited") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 53, 16]);
      getRecommendedMovies();
    } else if (mood === "Bored") {
      clearSelectedGenres();
      // selectedGenres.empty();
      setSelectedGenres([...selectedGenres, 14]);
      getRecommendedMovies();
    } else if (mood === "Confused") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 14, 10749]);
      getRecommendedMovies();
    } else if (mood === "Horny") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 10749]);
      getRecommendedMovies();
    } else if (mood === "Excited") {
      clearSelectedGenres();
      setSelectedGenres([...selectedGenres, 34, 878]);
      getRecommendedMovies();
    }
    // clearSelectedGenres();
  };

  // const displayMenu = () => {
  //     if (mood === 'happy') {
  //         console.log("Printing happy")

  //         setSelectedGenres([...selectedGenres,10749,12]) &&
  //         setSelectedGenres([...selectedGenres,53])

  //     } else if (mood === 'sad') {
  //         setMenu('sad');
  //     } else if (mood === 'horny') {
  //         setMenu('horny');
  //     }
  // }

  return (
    <div className="container-fluid">
      <div className="HomePage">
        <NavBar searchOn = {list} isHome={false} />
        <div className="HomeSearch">
          <h2 className="genreHeader">
            Get Movies Based on your <span>Mood</span>{" "}
          </h2>
          <h3 className="subTitle"> How are you feeling today?</h3>
          {/*Rendering the searchbar */}
          {/* <SearchBar movies={list} placeholder="Search for a Movie" /> */}
        </div>

        {visibility && (
          <div className="buttonGrid">
            {/* {homeGenreList.map((genre) => (
              <div
                key={genre.id}
                onClick={() => onTagClick(genre.id)}
                className={
                  selectedGenres.includes(genre.id)
                    ? "genreTagON"
                    : "genreTagOFF"
                }
              >
                {genre.name}
                {selectedGenres.includes(genre.id) ? (
                  <i className="fa fa-times" aria-hidden="true"></i>
                ) : null}
              </div>
            ))} */}

            <form>
              <label htmlFor="mood"></label>
              <br />
              <select
                id="mood"
                name="mood"
                placeholder="Select"
                value={mood}
                onChange={handleMoodChange}
              >
                <option value="">Select Mood</option>
                <option value="Happy">Happy</option>
                <option value="Relaxed">Relaxed</option>
                <option value="Angry">Angry</option>
                <option value="Bored">Bored</option>
                <option value="Sad">Sad</option>
                <option value="Confused">Confused</option>
                <option value="Horny">Horny</option>
                <option value="Excited">Excited</option>
              </select>
              <div className="btns">
                <button className="button" type="button" onClick={displayMenu}>
                  Submit
                </button>
                <button onClick={handleClearGenres}>Clear</button>
              </div>
            </form>
          </div>
        )}
        {console.log(selectedGenres)}
      </div>
      {/*Rendering selected genre movies */}
      <div className="container-fluid HomeMovies">
        <div className="container HomeMovieGrid">
          {currMovies.length > 0 ? renderMovies() : null}
        </div>
      </div>
      <div className="HomeFooter">
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
