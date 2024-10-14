import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import WatchlistPage from './pages/WatchlistPage';
import ReviewPage from './pages/ReviewPage';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <div className="logo">MovieStream</div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/watchlist">My List</Link></li>
              <li><Link to="/review">Reviews</Link></li>
              <li><Link to="/add-movie">Add Movie</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/add-movie" element={<AddMovie />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2023 MovieStream. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
