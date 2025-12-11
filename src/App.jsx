import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ProductProvider } from "./contexts/ProductContext";
import AllProducts from "./pages/AllProducts";

function App() {
  return (
    <ProductProvider>
      <div>
        <Navbar />

        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
        </Routes>

        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;