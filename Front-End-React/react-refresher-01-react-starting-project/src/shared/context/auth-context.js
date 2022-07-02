import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  // token: null,
  currentUser:null,
  role:null,
  entry:'user',
  login: () => {},
  logout: () => {},
  authMode: () => {}

});
