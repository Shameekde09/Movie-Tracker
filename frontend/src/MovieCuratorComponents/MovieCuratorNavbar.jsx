import { Link } from "react-router-dom";
import React from "react";
import "./MovieCuratorNavbar.css";

function MovieCuratorNavbar() {
  return (
    <nav className="navbar">
      {/* Title as clickable link */}
      <Link to="/home" className="logo">
        Movie Tracker
      </Link>

      <div className="nav-right">
        {/* Home link */}
        <Link to="/home" className="nav-link">
          Home
        </Link>

        {/* Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Movie ▼</button>

          <div className="dropdown-content">
            <Link to="/newmovie">Add Movie</Link>
            <Link to="/viewmovie">View Movie</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MovieCuratorNavbar;
