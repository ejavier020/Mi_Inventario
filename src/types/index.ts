export interface Product {
  id: string;
  code: string;
  name: string;
  date: string;
}


export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; 
  role: 'admin' | 'employee'; 
  avatarUrl?: string;
  createdAt: string;
}


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};