import { useEffect, useState } from "react";
// import { useToasts } from "react-toast-notifications";
import { toast } from "react-toastify";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { usePosts } from "../hooks";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  // const { addToast } = useToasts();
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    // do some checks
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      posts.addPostToState(response.data.post);
      toast.error("Post created successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
      // addToast("Post created successfully", {
      //   appearance: "success",
      // });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
      // addToast(response.message, {
      //   appearance: "error",
      // });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? "Adding post..." : "Add post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
