import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewMovie.css";
import { useNavigate } from "react-router-dom";
 
const ViewMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState(null);
  const [posterData, setPosterData] = useState(null);
  const navigate = useNavigate();
 
  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get("https://8080-daecbebabfcfbeabebabebeeeecabfced.premiumproject.examly.io/api/movies");
      setMovies(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchMovies();
  }, []);
 
  // Delete movie
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://8080-daecbebabfcfbeabebabebeeeecabfced.premiumproject.examly.io/api/movies/${deleteItem.id}`);
      setDeleteItem(null);
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div className="view-container">
      <h1 className="title">All Movies</h1>
 
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
 
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="no-rec">
                Loading...
              </td>
            </tr>
          ) : movies.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-rec">
                No movies available.
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie.movieId}>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.genre}</td>
                <td>{movie.releaseDate}</td>
                <td>
                  <button
                    className="btn view-btn"
                    onClick={() => setPosterData(movie)}
                  >
                    View Poster
                  </button>
 
                  <button
                    className="btn edit-btn"
                    onClick={() => navigate(`/editmovie/${movie.movieId}`)}
                  >
                    Edit
                  </button>
 
                  <button
                    className="btn delete-btn"
                    onClick={() => setDeleteItem(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
 
      {/* Delete Confirmation Popup */}
      {deleteItem && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              Are you sure you want to delete <b>{deleteItem.title}</b>?
            </h3>
 
            <div className="modal-actions">
              <button className="modal-confirm" onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
 
              <button
                className="modal-cancel"
                onClick={() => setDeleteItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* Poster Modal */}
      {posterData && (
        <div className="modal-overlay">
          <div className="poster-box">
            <h3>{posterData.title}</h3>
            <img
              src={`data:image/jpeg;base64,${posterData.posterImage}`}
              alt="Poster"
              className="poster-img"
            />
 
            <p>
              <b>Director:</b> {posterData.director}
            </p>
            <p>
              <b>Genre:</b> {posterData.genre}
            </p>
            <p>
              <b>Release:</b> {posterData.releaseDate}
            </p>
 
            <button
              className="modal-close"
              onClick={() => setPosterData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ViewMovie;
