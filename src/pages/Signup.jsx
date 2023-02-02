import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "./Signup.css";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const signInHandler = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) Navigate('/')
  })

  return (
    <div className="container">
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more...</h1>
            <h4>Watch anywhere, Cancel anytime.</h4>
            <h6>Ready to watch?</h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {/* <button>Get Started</button> */}
            <button onClick={signInHandler}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
