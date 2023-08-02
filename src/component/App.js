import Navbar from "./Navbar";
import Loader from "./Loader";
import "../styles/index.css";
import { useAuth } from "../hooks";
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login, Home, Page404, SignUp, Settings, UserProfile } from "../pages";

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
}
const App = () => {
  const auth = useAuth();
 

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />

          <Route exact path="/user/:userId" element={<UserProfile />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
