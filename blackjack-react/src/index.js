import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import Game from './Game';
import Leaderboard from './Leaderboard';
import firebase from "firebase/compat/app";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyDG3W6gYtaaHLOVd-ULWKMrhPZ10s5Lrck",
  authDomain: "blackjack-52235.firebaseapp.com",
  projectId: "blackjack-52235",
  storageBucket: "blackjack-52235.appspot.com",
  messagingSenderId: "151767467150",
  appId: "1:151767467150:web:a560960b11a9a8c121b5df",
  measurementId: "G-5HS7NV2SL8"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Game" element={<Game />} />
        <Route exact path="/Leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
