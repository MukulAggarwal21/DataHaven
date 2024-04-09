import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/about" element={ <About />}>
            </Route>
            <Route exact path="/" element = {<Home/>}>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
