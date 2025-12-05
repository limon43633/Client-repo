import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


function App() {


  return (
    <div>
     
     <Navbar />



     <Routes>

    {/* public routes */}

    <Route path="/" element={<Home />} />








     </Routes>


     
    </div>
  )
}

export default App
