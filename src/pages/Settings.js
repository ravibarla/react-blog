import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useState } from "react";
import { toast } from "react-toastify";
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };
  const updateProfile = async () => {
    setSavingForm(true);
    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error("please fill the fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      error = true;
    }
    if (password !== confirmPassword) {
      toast.error("password and confirm password does not match", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    if (response.succcess) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return toast.success("user updated successfully");
    } else {
      toast.error(response.error);
    }
    setSavingForm(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          alt=""
          src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldName}>Email</div>

        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldName}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>
      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldName}>password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldName}>confirm password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}
      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? "Saving Profile" : "Save Profile"}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
export default Settings;
