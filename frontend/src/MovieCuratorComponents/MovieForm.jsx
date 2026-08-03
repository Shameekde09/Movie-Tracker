import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieForm.css';
 
function MovieForm({ mode, movieId }) {
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [poster, setPoster] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorPopupMessage, setErrorPopupMessage] = useState('');
 
    useEffect(() => {
        if (mode === 'edit' && movieId) {
            setLoading(true);
            axios.get(`https://8080-eeccaaebefcdddbfcfbeabebabebeeeecabfced.premiumproject.examly.io/api/movies/${movieId}`)
                .then((res) => {
                    const data = res.data;
                    setTitle(data.title);
                    setDirector(data.director);
                    setGenre(data.genre);
                    setReleaseDate(data.releaseDate);
                })
                .catch(() => {
                    setErrorPopupMessage("Error loading movie");
                    setShowErrorPopup(true);
                })
                .finally(() => setLoading(false));
        }
    }, [mode, movieId]);
 
    const validateMovieForm = () => {
        const errors = {};
        if (!title) errors.title = 'Title is required.';
        if (!director) errors.director = 'Director name is required.';
        if (!genre) errors.genre = 'Please select a genre.';
        if (!releaseDate) errors.releaseDate = 'Release date is required.';
        if (mode !== 'edit' && !poster) errors.poster = 'Poster image is required.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
 
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPoster(file);
            setPreview(URL.createObjectURL(file));
        }
    };
 
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateMovieForm()) return;
 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('director', director);
        formData.append('genre', genre);
        formData.append('releaseDate', releaseDate);
        if (poster) formData.append('posterImage', poster);
 
        setLoading(true);
 
        const url =
            mode === 'add'
                ? 'https://8080-daecbebabfcfbeabebabebeeeecabfced.premiumproject.examly.io/api/movies'
                : `https://8080-daecbebabfcfbeabebabebeeeecabfced.premiumproject.examly.io/api/movies/${movieId}`;
 
        const request =
            mode === 'add'
                ? axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                : axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
 
        request
            .then(() => {
                setPopupMessage(mode === 'add' ? 'Movie added successfully!' : 'Movie updated successfully!');
                setShowPopup(true);
            })
            .catch(() => {
                setErrorPopupMessage(mode === 'add' ? 'Error adding movie!' : 'Error updating movie!');
                setShowErrorPopup(true);
            })
            .finally(() => setLoading(false));
    };
 
    return (
        <>
            {showPopup && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p className="modal-message">{popupMessage}</p>
                        <button className="modal-ok-btn" onClick={() => setShowPopup(false)}>OK</button>
                    </div>
                </div>
            )}
 
            {showErrorPopup && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p className="modal-message">{errorPopupMessage}</p>
                        <button className="modal-ok-btn" onClick={() => setShowErrorPopup(false)}>OK</button>
                    </div>
                </div>
            )}
 
            <form onSubmit={handleSubmit}>
                <h1>{mode === 'edit' ? 'Edit Movie' : 'Create New Movie'}</h1>
 
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {formErrors.title && <span>{formErrors.title}</span>}
                </div>
 
                <div>
                    <label>Director</label>
                    <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
                    {formErrors.director && <span>{formErrors.director}</span>}
                </div>
 
                <div>
                    <label>Genre</label>
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">Select Genre</option>
                        <option>Action</option>
                        <option>Adventure</option>
                        <option>Comedy</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Romance</option>
                        <option>Thriller</option>
                    </select>
                    {formErrors.genre && <span>{formErrors.genre}</span>}
                </div>
 
                <div>
                    <label>Release Date</label>
                    <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                    {formErrors.releaseDate && <span>{formErrors.releaseDate}</span>}
                </div>
 
                <div>
                    <label>Poster</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && <img src={preview} alt="Preview" style={{ width: "150px" }} />}
                    {formErrors.poster && <span>{formErrors.poster}</span>}
                </div>
 
                <button type="submit" style={{ backgroundColor: mode === 'edit' ? 'red' : 'blue', width: '100%' }}>
                    {mode === 'edit' ? 'Update' : 'Add'}
                </button>
 
                {loading && <p className="loading-text">Loading...</p>}
            </form>
        </>
    );
}
 
export default MovieForm;
