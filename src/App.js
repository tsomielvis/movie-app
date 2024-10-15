import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Movies</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={MovieSearch} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
