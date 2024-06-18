import React from "react";
import Login from "./Components/login/Login";
import Signup from "./Components/signUp/Signup";
import Books from "./Books";


import {BrowserRouter, Routes, Route} from 'react-router-dom';


export default function  App(){

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/books" element={<Books />}></Route>


        </Routes>
          
        </BrowserRouter>
    )

}