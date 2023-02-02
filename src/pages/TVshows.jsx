import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import SelectGenre from "../components/SelectGenre";

function TVshows() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const movies = useSelector((state) => state.movies_blog.movies);
  // const genres = useSelector((state) => state.movies_blog.genres);
  // const genresLoaded = useSelector((state) => state.movies_blog.genresLoaded);
  const movies = useSelector((state) => state.movies_blog.movies);
  const genres = useSelector((state) => state.movies_blog.genres);
  const genresLoaded = useSelector((state) => state.movies_blog.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="container">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data" style={{ marginTop: "5rem" }}>
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <Slider movies={movies} />
        ) : (
          <h1>No Movies Available for selected genre</h1>
        )}
      </div>
    </div>
  );
}

export default TVshows;
