// client/src/components/PrivateRoute.jsx - UPDATED VERSION
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { userAPI } from '../services/api';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  // Extract path to determine required role
  const currentPath = location.pathname;
  
  // Define role requirements for each path
  const getRequiredRolesForPath = (path) => {
    if (path.includes('/dashboard/admin-') || path.includes('/dashboard/manage-users')) {
      return ['admin'];
    } else if (path.includes('/dashboard/add-product') || 
               path.includes('/dashboard/manage-products') ||
               path.includes('/dashboard/pending-orders') ||
               path.includes('/dashboard/approved-orders')) {
      return ['manager', 'admin']; // Admin can also access manager routes
    } else if (path.includes('/dashboard/my-orders') || 
               path.includes('/dashboard/track-order')) {
      return ['buyer', 'manager', 'admin']; // All roles can access
    } else if (path.includes('/dashboard/profile')) {
      return ['buyer', 'manager', 'admin']; // All roles can access profile
    } else if (path === '/dashboard') {
      return ['buyer', 'manager', 'admin']; // Dashboard home
    }
    return []; // No specific role required
  };

  // Get required roles for current path
  const pathRequiredRoles = getRequiredRolesForPath(currentPath);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          // Check localStorage first (for performance)
          const storedRole = localStorage.getItem('userRole');
          const storedRoleTimestamp = localStorage.getItem('userRoleTimestamp');
          const oneHour = 60 * 60 * 1000;
          
          if (storedRole && storedRoleTimestamp && 
              (Date.now() - parseInt(storedRoleTimestamp)) < oneHour) {
            // Use cached role if less than 1 hour old
            setUserRole(storedRole);
          } else {
            // Fetch fresh role from API
            const response = await userAPI.getUserByEmail(user.email);
            const role = response.data?.role || 'buyer';
            setUserRole(role);
            
            // Cache in localStorage
            localStorage.setItem('userRole', role);
            localStorage.setItem('userRoleTimestamp', Date.now().toString());
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          // Use default role
          const defaultRole = 'buyer';
          setUserRole(defaultRole);
          localStorage.setItem('userRole', defaultRole);
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

  // Show loading while checking auth and role
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

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (userRole && pathRequiredRoles.length > 0 && !pathRequiredRoles.includes(userRole)) {
    // User doesn't have required role - redirect to appropriate page
    
    // First, show an unauthorized message
    setTimeout(() => {
      alert(`Access Denied! You need ${pathRequiredRoles.join(' or ')} role to access this page.`);
    }, 100);
    
    // Redirect based on user's actual role
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

export default PrivateRoute;