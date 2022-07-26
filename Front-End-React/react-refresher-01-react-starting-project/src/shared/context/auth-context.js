import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  // token: null,
  currentUser:null,
  isMax:false,
  role:null,
  entry:'user',
  login: () => {},
  logout: () => {},
  setMax: () => {},
  authMode: () => {}

});
