import React, { useState } from 'react';

const AddMovie = () => {
  const [movie, setMovie] = useState({ title: '', director: '', year: '', imageUrl: '' });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Movie added:', movie);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="add-movie">
      <h1>Add a New Movie</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Movie Title" value={movie.title} onChange={handleChange} required />
        <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} required />
        <input type="number" name="year" placeholder="Release Year" value={movie.year} onChange={handleChange} required />
        <input type="url" name="imageUrl" placeholder="Movie Poster URL" value={movie.imageUrl} onChange={handleChange} required />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;