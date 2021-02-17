import {createContext, useContext} from 'react';

type Context = {
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<Context>({
  signIn: () => console.warn('no auth provider'),
  signOut: () => console.warn('no auth provider'),
});

export const useAuth = () => useContext(AuthContext);
