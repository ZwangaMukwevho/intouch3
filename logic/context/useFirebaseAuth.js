import { useState, useEffect } from "react";
import { app } from "../config/firebaseConfig";

import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth).then(clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, []);

  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
        router.push("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const sendVerification = () => sendEmailVerification(auth.currentUser);

  return {
    authUser,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    resetPassword,
    sendVerification,
  };
}
