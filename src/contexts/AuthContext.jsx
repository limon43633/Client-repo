import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Register with Email & Password
  const registerWithEmail = async (email, password, name, photoURL, role) => {
    setLoading(true);
    try {
      // Create user in Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name and photo
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || 'https://via.placeholder.com/150'
      });

      // Save user to MongoDB
      await saveUserToDatabase({
        uid: result.user.uid,
        email: result.user.email,
        name: name,
        photoURL: photoURL || 'https://via.placeholder.com/150',
        role: role,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      return result.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Email & Password
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Save user to MongoDB (if new user)
      await saveUserToDatabase({
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        role: 'buyer', // Default role for social login
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with GitHub
  const loginWithGithub = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      
      // Save user to MongoDB (if new user)
      await saveUserToDatabase({
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        role: 'buyer', // Default role for social login
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      return result.user;
    } catch (error) {
      console.error('GitHub login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Save user to MongoDB
  const saveUserToDatabase = async (userData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        userData
      );
      return response.data;
    } catch (error) {
      // If user already exists, that's fine
      if (error.response?.status === 409) {
        console.log('User already exists in database');
        return;
      }
      console.error('Error saving user to database:', error);
      throw error;
    }
  };

  // Get user data from MongoDB
  const getUserData = async (uid) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${uid}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get additional user data from MongoDB
        const userData = await getUserData(currentUser.uid);
        setUser({ ...currentUser, ...userData });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
    logout,
    getUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};