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
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <div>
        {/* <Router> */}
          <NoteState>
            <Router>
            <Navbar />
            <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />}>
              </Route>
              <Route exact path="/" element={<Home />}>
              </Route>
            </Routes>
            </div>
            </Router>
          </NoteState>
        {/* </Router> */}

      </div>
    </>
  );
}

export default App;
