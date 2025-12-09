import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ProductProvider } from "./contexts/ProductContext";

function App() {
  return (
    <ProductProvider>
      <div>
        <Navbar />

        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;