import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import LoadingOverlay from '../ui/common/LoadingOverlay';

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    getAccessToken();
  }, []);

  async function getAccessToken() {
    const tk = await AsyncStorage.getItem('token');
    setToken(tk);
    setIsFetching(true);
  }

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isFetching ? <LoadingOverlay /> : <>{children}</>}
    </AuthContext.Provider>
  );
};
