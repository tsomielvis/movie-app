import { Link } from "react-router-dom";
import "./styles/NavBarStyles.css";
import AppLogo from "./images/Logo2.png";

const NavigationBar = ({ isHomePage }) => {
  const projectRepositoryUrl = "https://github.com/tsomielvis/movie-recommendation-app";

  return (
    <header className="app-header container">
      <Link to="/">
        <img src={AppLogo} className="app-logo" alt="App Logo" />
      </Link>

      {isHomePage ? (
        <Link to="/" className="nav-button animated">
          <i className="fas fa-home"></i> Home
        </Link>
      ) : (
        <a
          href={projectRepositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button animated"
        >
          <i className="fa-brands fa-github"></i> Source Code
        </a>
      )}
    </header>
  );
};

export default NavigationBar;
