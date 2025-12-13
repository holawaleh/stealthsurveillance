import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';


interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // mock logged-in user
  const [user, setUser] = useState<User | null>({
    id: 'demo-user',
    email: 'demo@silentcamera.local',
  });

  const signOut = () => {
    setUser(null);
    console.log('Signed out (mock)');
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
