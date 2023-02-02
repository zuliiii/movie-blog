import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Movies.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store/index.js";
import Slider from "../components/Slider.jsx";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  // const movies = useSelector((state) => state.movies_blog.movies);
  // const genres = useSelector((state) => state.movies_blog.genres);
  // const genresLoaded = useSelector((state) => state.movies_blog.genresLoaded);

  const movies = useSelector((state) => state.movies_blog.movies);
  const genres = useSelector((state) => state.movies_blog.genres);
  const genresLoaded = useSelector((state) => state.movies_blog.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="container">
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          className="background-image"
          src={backgroundImage}
          alt="background Image"
        />
        <div className="containerr">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </div>
  );
}
