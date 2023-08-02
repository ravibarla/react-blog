import { useState } from "react";
import styles from "../styles/login.module.css";
// import { login } from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      return toast.error("Please enter email and password!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
    }
    const response = await auth.login(email, password);
    if (response.success) {
      toast.success("successfully logged in");
    } else {
      toast.error(response.message);
    }
    setLoggingIn(false);
  };
  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}></span>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in ..." : "Log In"}
        </button>
      </div>
    </form>
  );
};
export default Login;
