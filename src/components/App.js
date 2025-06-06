
import React, { useState } from "react";
import './../styles/App.css';


const App = () => {

  const API_KEY = '99eb9fd1';
  const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  if (!name) return;

  fetch(`${OMDB_API_URL}${name}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
        setName("");
      } else {
        setMovies([]);
        setName("");
        setError('Invalid movie name. Please try again.');
      }
    })
    .catch(error => {
      setMovies([]);        
      setName("");
      setError('An error occurred. Please try again later.');
    });
};


  return (
    <div>
      <h2>Search Movie</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="search your movie" value={name} onChange={(e)=>{setName(e.target.value)}}/>  
      <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="movie-results">
        {movies.length === 0 && !error ? (
          <li>No movies found.</li>
        ) : (
          movies.map((movie) => (
            <li key={movie.imdbID} className="movie-card">
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))
        )}
      </ul>
      
    </div>
  )
}

export default App
