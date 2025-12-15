import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ProductProvider } from "./contexts/ProductContext";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import BookingPage from "./pages/BookingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboards/DashboardHome";
import MyOrders from "./pages/dashboards/MyOrders";
import Profile from "./pages/dashboards/Profile";
import TrackOrder from "./pages/dashboards/TrackOrder";
import AddProduct from "./pages/dashboards/AddProduct";
import ManageProducts from "./pages/dashboards/ManageProducts";
import PendingOrders from "./pages/dashboards/PendingOrders";
import ApprovedOrders from "./pages/dashboards/ApprovedOrders";
import ManageUsers from "./pages/dashboards/ManageUsers";
import AdminAllProducts from "./pages/dashboards/AdminAllProducts";
import AdminAllOrders from "./pages/dashboards/AdminAllOrders";

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <AuthProvider>
      <ProductProvider>
        <div>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#f97316',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          {/* Show Navbar only on NON-Dashboard pages */}
          {!isDashboardPage && <Navbar />}

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private routes */}
            <Route path="/product/:id" element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            } />
            
            <Route path="/booking/:id" element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            } />

            {/* Dashboard routes - Nested */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }>
              <Route index element={<DashboardHome />} />
              {/* Common routes */}
              <Route path="profile" element={<Profile />} />
              
              {/* Buyer routes */}
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="track-order" element={<TrackOrder />} />
              
              {/* Manager routes */}
              <Route path="add-product" element={<AddProduct />} />
              <Route path="manage-products" element={<ManageProducts />} />
              <Route path="pending-orders" element={<PendingOrders />} />
              <Route path="approved-orders" element={<ApprovedOrders />} />
              
              {/* Admin routes */}
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="all-products" element={<AdminAllProducts />} />
              <Route path="all-orders" element={<AdminAllOrders />} />
            </Route>
          </Routes>

          {/* Show Footer only on NON-Dashboard pages */}
          {!isDashboardPage && <Footer />}
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;