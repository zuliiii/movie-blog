import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import NavMovies from "./pages/NavMovies";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVshows from "./pages/TVshows";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<NavMovies />} />
        <Route exact path="/tv" element={<TVshows />} />
        <Route exact path="/" element={<Movies />} />
        
      </Routes>
    </BrowserRouter>
  );
}
