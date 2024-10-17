import "./App.css";
import React, { useState } from "react";

import Login from "./Pages/Login";
import Watchlist from "./Pages/Components/Watchlist";
import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResult";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      {/* {isLoggedIn ? (
        <Login />
      ) : (
        <Home/>
      )} */}
      {/* {isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />} */}

      <Router>
      <Routes>
          <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/search/:id" element={<SearchResult />} />
          <Route exact path="/Watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
