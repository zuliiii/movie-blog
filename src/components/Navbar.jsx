import React from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import "./Navbar.css";

export default function Navbar(isScrolled) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  return (
    <div>
      <div className="conainer">
        <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
          <div className="left flex a-center">
            <div className="brand flex a-center j-center">
              <img src={logo} alt="logo" />
            </div>
            <ul className="links flex">
              {links.map(({ name, link }) => {
                return (
                  <li key={name}>
                    <Link to={Link}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right flex a-center">
            <div className="search">
              <button>
                <FaSearch />
              </button>
              <input type="text" placeholder="Search" />
            </div>
            <button onClick={() => signOut(firebaseAuth)}>
              <FaPowerOff />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
