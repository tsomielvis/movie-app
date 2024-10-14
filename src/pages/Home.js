import React from 'react';
import MovieList from '../components/MovieList';

const Home = () => {
  const featuredMovie = {
    id: 1,
    title: "Inception",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    year: 2010,
    director: "Christopher Nolan"
  };

  const categories = [
    {
      name: "Trending Now",
      movies: [
        { id: 2, title: "The Shawshank Redemption", imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
        { id: 3, title: "The Godfather", imageUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
        { id: 4, title: "The Dark Knight", imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
        { id: 5, title: "Pulp Fiction", imageUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
      ]
    },
    {
      name: "Top Rated",
      movies: [
        { id: 6, title: "Forrest Gump", imageUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
        { id: 7, title: "The Matrix", imageUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
        { id: 8, title: "Goodfellas", imageUrl: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
        { id: 9, title: "Schindler's List", imageUrl: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
      ]
    }
  ];

  return (
    <div className="home">
      <section className="featured-movie">
        <img src={featuredMovie.imageUrl} alt={featuredMovie.title} />
        <div className="featured-info">
          <h1>{featuredMovie.title}</h1>
          <p>{featuredMovie.description}</p>
          <button className="play-btn">Play</button>
          <button className="more-info-btn">More Info</button>
        </div>
      </section>
      {categories.map((category, index) => (
        <MovieList key={index} category={category} />
      ))}
    </div>
  );
};

export default Home;
