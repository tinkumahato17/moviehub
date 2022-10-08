import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "./Context";


const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Debounce Debouncing is used for optimizing the performance of a web app. It is done by limiting the rate of execution of a particular function (also known as rate limiting). We will learn about debouncing by implementing it on an input box with an onChange event.
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 800);
    return () => clearTimeout(timerOut);
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">
          Loading....
        </div>
      </div>
    )
  }
  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Director}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating}/10</p>
            <p className="card-text">{movie.Awards}</p>
            <p className="card-text">{movie.Writer}</p>
            <NavLink to="/" className="back-btn">Go Back</NavLink>
          </div>
        </div>
      </section>
    </>

  );
};


export default SingleMovie;