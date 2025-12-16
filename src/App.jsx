// client/src/App.jsx - UPDATED Role Protection
import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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

// Dashboard Pages
import MyOrder from "./pages/dashboards/buyer/MyOrder";
import TrackOrder from "./pages/dashboards/TrackOrder";
import ManageUsers from "./pages/dashboards/admin/ManageUsers";
import AdminAllProducts from "./pages/dashboards/admin/AdminAllProducts";
import AdminAllOrders from "./pages/dashboards/admin/AdminAllOrders";
import AddProduct from "./pages/dashboards/manager/AddProduct";
import ManageProducts from "./pages/dashboards/manager/ManageProducts";
import PendingOrders from "./pages/dashboards/manager/PendingOrders";
import ApprovedOrders from "./pages/dashboards/manager/ApprovedOrders";
import DashboardHome from "./pages/dashboards/DashboardHome";
import Profile from "./pages/dashboards/Profile";

// Role-based Route Protection Component
const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const userRole = user?.role || 'buyer';
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    let redirectPath = '/dashboard';
    
    switch(userRole) {
      case 'admin':
        redirectPath = '/dashboard/all-products';
        break;
      case 'manager':
        redirectPath = '/dashboard/manage-products';
        break;
      default: // buyer
        redirectPath = '/dashboard/my-orders';
    }
    
    return <Navigate to={redirectPath} replace />;
  }
  
  return children;
};

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

            {/* Dashboard routes - Nested with Role Protection */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }>
              <Route index element={<DashboardHome />} />
              
              {/* Common routes - All roles can access */}
              <Route path="profile" element={<Profile />} />
              <Route path="track-order" element={<TrackOrder />} />
              
              {/* Buyer routes */}
              <Route path="my-orders" element={
                <RoleProtectedRoute allowedRoles={['buyer', 'manager', 'admin']}>
                  <MyOrder />
                </RoleProtectedRoute>
              } />
              
              {/* Manager routes - Manager and Admin can access */}
              <Route path="add-product" element={
                <RoleProtectedRoute allowedRoles={['manager', 'admin']}>
                  <AddProduct />
                </RoleProtectedRoute>
              } />
              
              <Route path="manage-products" element={
                <RoleProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManageProducts />
                </RoleProtectedRoute>
              } />
              
              <Route path="pending-orders" element={
                <RoleProtectedRoute allowedRoles={['manager', 'admin']}>
                  <PendingOrders />
                </RoleProtectedRoute>
              } />
              
              <Route path="approved-orders" element={
                <RoleProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ApprovedOrders />
                </RoleProtectedRoute>
              } />
              
              {/* Admin routes - Only Admin can access */}
              <Route path="manage-users" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </RoleProtectedRoute>
              } />
              
              <Route path="all-products" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <AdminAllProducts />
                </RoleProtectedRoute>
              } />
              
              <Route path="all-orders" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <AdminAllOrders />
                </RoleProtectedRoute>
              } />
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