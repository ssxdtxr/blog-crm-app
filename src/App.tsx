import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Login} from "./pages/Login/Login";
import {SignIn} from "./pages/SignIn/SignIn";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
        </Routes>
    );
}

export default App;
