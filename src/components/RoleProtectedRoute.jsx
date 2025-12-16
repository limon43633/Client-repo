// client/src/components/RoleProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { userAPI } from '../services/api';

const RoleProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          // Check localStorage first
          const storedRole = localStorage.getItem('userRole');
          
          if (storedRole) {
            setUserRole(storedRole);
          } else {
            // Fetch from API
            const response = await userAPI.getUserByEmail(user.email);
            const role = response.data?.role || 'buyer';
            setUserRole(role);
            localStorage.setItem('userRole', role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          // Default to buyer if API fails
          setUserRole('buyer');
          localStorage.setItem('userRole', 'buyer');
        }
      }
      setCheckingRole(false);
    };

    if (user) {
      fetchUserRole();
    } else {
      setCheckingRole(false);
    }
  }, [user]);

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (requiredRoles.length > 0 && userRole && !requiredRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    let redirectPath = '/dashboard';
    
    switch(userRole) {
      case 'admin':
        redirectPath = '/dashboard/all-products'; // Admin dashboard
        break;
      case 'manager':
        redirectPath = '/dashboard/manage-products'; // Manager dashboard
        break;
      default:
        redirectPath = '/dashboard/my-orders'; // Buyer dashboard
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default RoleProtectedRoute;