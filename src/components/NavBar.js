import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar">
    <h1>Movie App</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/watchlist">Watchlist</Link></li>
      <li><Link to="/reviews">Reviews</Link></li>
      <li><Link to="/add-movie">Add Movie</Link></li>
    </ul>
  </nav>
);

export default NavBar;
