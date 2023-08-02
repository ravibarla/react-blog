import { useState } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
// import { useToasts } from 'react-toast-notifications';
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import styles from "../styles/login.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState("");
  // const { addToast } = useToasts();
  const auth = useAuth();
  const history = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });

      // addToast('Please fill all the fields', {
      //   appearance: 'error',
      //   autoDismiss: true,
      // });
      error = true;
    }

    // console.log(
    //   password + "  " + confirmPassword,
    //   password !== confirmPassword
    // );

    if (password !== confirmPassword) {
      error = true;
      toast.error("Make sure password and confirm password matches", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });

      // addToast('Make sure password and confirm password matches', {
      //   appearance: 'error',
      //   autoDismiss: true,
      // });

      // error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      history("/login");
      setSigningUp(false);

      return toast.success("User registered successfully, please login now");

      // return addToast('User registered successfully, please login now', {
      //   appearance: 'success',
      //   autoDismiss: true,
      // });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });

      // addToast(response.message, {
      //   appearance: 'error',
      //   autoDismiss: true,
      // });
    }

    setSigningUp(false);
  };

  // if (auth.user) {
  // return <Redirect to="/" />;
  // return (
  //   <Routes>
  //     <Route to="/" />;
  //   </Routes>
  // );
  //     <Routes>

  //     <Route path="/" element={<Navigate replace to="/home" />} />
  //   </Routes>
  // );

  //   return <Navigate replace to="/" />;
  // }
if(auth.user){
  return <Navigate to="/"/>
}
  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? "Signing up..." : "Signup"}
        </button>
      </div>
    </form>
  );
};

export default Signup;
