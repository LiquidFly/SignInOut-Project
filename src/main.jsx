import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import {FirebaseProvider} from "./FirebaseContext/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RecoilRoot>
    <FirebaseProvider>
        <App />
    </FirebaseProvider>
      </RecoilRoot>
  </React.StrictMode>
);
