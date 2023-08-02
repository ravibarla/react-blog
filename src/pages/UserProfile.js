import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { addFriend, removeFriend, fetchUserProfile } from "../api";
import Loader from "../component/Loader";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [requestInProgress, setRequestInProgress] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the toast automatically after 3 seconds
          // hideProgressBar: false, // Show the progress bar
          // pauseOnHover: true, // Pause the toast timer on hover,
        });
        return navigate("/");
      }
      setLoading(false);
    };
    getUser();
  }, [userId, navigate, toast]);
  if (loading) {
    <Loader />;
  }

  const checkIfUserIsFreinds = () => {
    const friends = auth.user.friends;

    const friendIds = friends.map((friend) => friend.to_user._id);

    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };
  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFreind(true, friendship);
      toast.success("friend added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
    }

    setRequestInProgress(false);
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      
      auth.updateUserFreind(false, friendship[0]);
      toast.success("friend removed successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
    }

    setRequestInProgress(false);
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
        <div className={styles.fieldLabel}>Email</div>

        <div className={styles.fieldValue}>{user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsFreinds() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? "Removing friend..." : "Remove Friend"}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? "Adding friend..." : "Add Friend"}
          </button>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
