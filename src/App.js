import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./component/MovieCard";
import searchIcon from "./search.svg";
import img from "./img/new passport pic.png"

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=21c4f75d";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies(searchTerm);
  };

  useEffect(() => {
    console.log(movies)
    searchMovies("superman");
  }, []);

  return (
    <div className="app">
      <h1>ZeusFlix</h1>
      <img className="profile" src={img} alt="passport" />

      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button type="submit">
            <img src={searchIcon} alt="search icons" />
          </button> */}
        </form>
      </div>

      <div className="container">
        {movies && movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie1={movie} key={movie.imdbID} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
