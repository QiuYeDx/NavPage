import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import NavBar from './components/NavBar/NavBar'
import PageA from "./views/PageA/PageA";
import PageB from "./views/PageB/PageB";
import About from "./views/About/About";
import Error from "./views/Error/Error";
import { Wrapper } from "./Styled.twin";

function App() {
  return (
      <Wrapper>
          <BrowserRouter>
              <NavBar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/tools" element={<PageA/>}/>
                  <Route path="/resources" element={<PageB/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="*" element={<Error/>}/>
              </Routes>
          </BrowserRouter>
      </Wrapper>
  );
}

export default App;
