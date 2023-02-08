import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import "./UserLiked.css";

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.movies_blog.movies);
  const genres = useSelector((state) => state.movies_blog.genres);
  const genresLoaded = useSelector((state) => state.movies_blog.genresLoaded);

  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, []);

  // useEffect(() => {
  //   if (genresLoaded) {
  //     dispatch(fetchMovies({ type: "movie" }));
  //   }
  // }, [genresLoaded]);

  return (
    <div className="userliked-container">
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
