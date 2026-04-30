import { useState } from 'react';
import { User } from '../types';
import { firebaseApi } from '../api/firebase';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const register = async (user: User) => {
    await firebaseApi.post('users', user); 
  };

  const login = async (email: string) => {
    try {
      const users: any[] = await firebaseApi.get('users');
      const found = users.find(u => u.email === email);
      if (found) {
        setCurrentUser(found);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  return { currentUser, login, register, logout: () => setCurrentUser(null) };
};