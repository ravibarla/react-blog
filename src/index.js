import React from "react";
import ReactDOM from "react-dom/client";

import App from "./component/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import { AuthProvider } from "./providers/AuthProvider";

import { PostsProvider } from "./providers/PostsProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
        <ToastContainer />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);
