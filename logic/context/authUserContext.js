import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "./useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
  signInWithGoogle: async () => {},
  resetPassword: async () => {},
  sendVerification: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuthUserContext = () => useContext(authUserContext);
