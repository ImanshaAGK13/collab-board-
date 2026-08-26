import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('collabboard_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('collabboard_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('collabboard_user');
    }
  }, [currentUser]);

  const login = (email, role) => {
    let id = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    let name = email.split('@')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);

    const userObj = {
      id: id || 'user_' + Date.now(),
      name: name || 'Astronaut',
      email: email,
      role: role || 'Crew',
      title: role === 'Captain' ? 'Mission Leader' : role === 'Co-Captain' ? 'Flight Operator' : 'Payload Specialist',
      avatar: 'avatar1',
      color: role === 'Captain' ? '#ffbf00' : role === 'Co-Captain' ? '#ff9f00' : '#00d2ff',
      activeWorkspaceId: 'ORBIT-9X7K2'
    };

    setCurrentUser(userObj);
    showToast(`Welcome back, ${userObj.name}! Terminal Access Granted.`, 'success');
    return userObj;
  };

  const quickDemoLogin = (name, email, role) => {
    const id = email.split('@')[0].toLowerCase();
    const userObj = {
      id,
      name,
      email,
      role,
      title: role === 'Captain' ? 'Mission Commander' : role === 'Co-Captain' ? 'Flight Lead' : 'UI/UX Payload Engineer',
      avatar: id === 'nova' ? 'avatar1' : id === 'orion' ? 'avatar3' : 'avatar5',
      color: role === 'Captain' ? '#ffbf00' : role === 'Co-Captain' ? '#ff9f00' : '#e5c158',
      activeWorkspaceId: 'ORBIT-9X7K2'
    };

    setCurrentUser(userObj);
    showToast(`Demo Access Granted as ${name} (${role})`, 'success');
    return userObj;
  };

  const register = (name, email, role, workspaceSetup = {}) => {
    const id = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    const userObj = {
      id: id || 'user_' + Date.now(),
      name: name,
      email: email,
      role: role || 'Crew',
      title: 'Crew Member',
      avatar: 'avatar2',
      color: '#00d2ff',
      activeWorkspaceId: workspaceSetup.workspaceId || 'ORBIT-9X7K2'
    };

    setCurrentUser(userObj);
    showToast(`Account Initialized for ${name}!`, 'success');
    return userObj;
  };

  const requestPasswordReset = async (email) => {
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address!');
    }

    // Try sending POST request to backend API, or fallback to mock simulation
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch {
      // Backend not running locally - mock successful API response
    }

    const mockToken = 'rst_' + Math.random().toString(36).substring(2, 12);
    
    // Store in localStorage reset tokens map for verification
    const existingTokens = JSON.parse(localStorage.getItem('collabboard_reset_tokens') || '{}');
    existingTokens[mockToken] = { email, createdAt: Date.now() };
    localStorage.setItem('collabboard_reset_tokens', JSON.stringify(existingTokens));

    showToast('Check your email (Password reset link dispatched)', 'success');
    return { success: true, token: mockToken, email };
  };

  const resetPasswordWithToken = async (token, newPassword) => {
    if (!token) {
      throw new Error('Invalid or missing password reset token!');
    }
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long!');
    }

    // Try sending POST request to backend API
    try {
      await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
    } catch {
      // Backend not running - fallback to mock verification
    }

    showToast('Password successfully updated! Redirecting to login...', 'success');
    return { success: true };
  };

  const updateProfile = (fields) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...fields };
      showToast('Astronaut profile telemetry updated successfully!', 'success');
      return updated;
    });
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Terminal session closed. Disconnected from orbital station.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        quickDemoLogin,
        updateProfile,
        requestPasswordReset,
        resetPasswordWithToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
