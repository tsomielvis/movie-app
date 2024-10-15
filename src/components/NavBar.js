import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Link to the CSS file for better UI

const NavBar = () => (
  <nav className="navbar">
    <h1 className="app-title">MovieApp</h1>
    <ul className="navbar-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/watchlist">Watchlist</Link></li>
      <li><Link to="/reviews">Reviews</Link></li>
      <li><Link to="/add-movie">Add Movie</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
    </ul>
  </nav>
);

export default NavBar;
