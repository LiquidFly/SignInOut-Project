import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AccCreated } from "../Recoil/Recoil.js";
import { useSetRecoilState } from "recoil";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCWD_dg3VVWAjbKvEXY_3fVJUU9C3ay4VM",
  authDomain: "reactdevelopnmentversion.firebaseapp.com",
  projectId: "reactdevelopnmentversion",
  storageBucket: "reactdevelopnmentversion.appspot.com",
  messagingSenderId: "320743947918",
  appId: "1:320743947918:web:27c2f73b92184c0b5c93df",
};

export const FirebaseApp = initializeApp(firebaseConfig);
const Auth = getAuth(FirebaseApp);

const FirebaseContext = createContext();
export function UseFirebaseContext() {
  return useContext(FirebaseContext);
}

export const FirebaseProvider = ({ children }) => {
  const setCreated = useSetRecoilState(AccCreated);
  // console.log(setCreated);
  function SignUpUser(Email, Password) {
    createUserWithEmailAndPassword(Auth, Email, Password)
      .then(() => {
        setCreated(true);
        alert("User created");
      })
      .catch((err) => console.log("Error" + err.message));
  }

  const ContextValue = { SignUpUser };

  return (
    <FirebaseContext.Provider value={ContextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};
