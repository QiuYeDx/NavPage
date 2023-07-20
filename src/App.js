import React from 'react';
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import NavBar from './components/NavBar/NavBar'
import Tools from "./views/Tools/Tools";
import Resources from "./views/Resources/Resources";
import About from "./views/About/About";
import Error from "./views/Error/Error";
import { Wrapper } from "./Styled.twin";

function App() {
  return (
      <Wrapper>
          <HashRouter>
              <NavBar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/tools" element={<Tools/>}/>
                  <Route path="/tools/:toolId" element={<Tools/>}/>
                  <Route path="/resources" element={<Resources/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="*" element={<Error/>}/>
              </Routes>
          </HashRouter>
      </Wrapper>
  );
}

export default App;
