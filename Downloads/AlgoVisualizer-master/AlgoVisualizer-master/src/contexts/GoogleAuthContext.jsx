import { createContext, useContext, useEffect, useState } from 'react';

const GoogleAuthContext = createContext();

export const useGoogleAuth = () => useContext(GoogleAuthContext);

export const GoogleAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('googleUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const initializeGoogleAuth = () => {
      // Mock Google Auth initialization for development
      console.log("Mock: Google Auth initialized");
      setIsInitialized(true);
    };

    const handleCredentialResponse = (response) => {
      // Mock credential response
      const mockUser = {
        id: "123456789",
        name: "Test User",
        email: "testuser@example.com",
        picture: "https://ui-avatars.com/api/?name=Test+User&background=random"
      };
      
      setUser(mockUser);
      // Store in localStorage for persistence
      localStorage.setItem('googleUser', JSON.stringify(mockUser));
      localStorage.setItem('isLoggedIn', 'true');
      console.log(`Mock: Welcome, ${mockUser.name}! You have successfully signed in.`);
    };

    // Just initialize directly for mock implementation
    initializeGoogleAuth();

    return () => {
      // Cleanup
    };
  }, []);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('googleUser');
    window.google.accounts.id.disableAutoSelect();
    // Optionally revoke token
  };

  const renderGoogleButton = (elementId) => {
    if (isInitialized && window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        { theme: 'outline', size: 'large' }
      );
    }
  };

  return (
    <GoogleAuthContext.Provider value={{ user, signOut, renderGoogleButton }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
