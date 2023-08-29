import React from 'react';
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import NavBar from './modules/NavBar/NavBar'
import Tools from "./views/Tools/Tools";
import Resources from "./views/Resources/Resources";
import About from "./views/About/About";
import Error from "./views/Error/Error";
import {Wrapper} from "./Styled.twin";
import Dashboard from "@/views/Dashboard/Dashboard";
import ToolView from "@/views/Tools/ToolView";

function App() {
    return (
        <>
            <Wrapper id={'rootWrapper'}>
                <HashRouter>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/tools" element={<Tools/>}/>
                        <Route path="/tools/:toolId" element={<ToolView/>}/>
                        <Route path="/resources" element={<Resources/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="*" element={<Error/>}/>
                    </Routes>
                </HashRouter>
            </Wrapper>
        </>
    );
}

export default App;
