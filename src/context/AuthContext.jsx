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
    // Check against mock crew or create profile
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
    <AuthContext.Provider value={{ currentUser, login, register, logout, quickDemoLogin, updateProfile }}>
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
