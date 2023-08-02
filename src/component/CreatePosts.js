import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPosts } from "../api";
import { toast } from "react-toastify";
import { usePosts } from "../hooks";
const CreatePosts = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPosts = async () => {
    setAddingPost(true);
    //do somechecks
    const response = await addPosts(post);
    if (response.success) {
      setPost("");
      posts.addPostToState(response.data.post);
      toast.success("post created successfully", {
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
          onClick={handleAddPosts}
          disabled={addingPost}
        >
          {addingPost ? "adding posts" : "add post"}
        </button>
      </div>
    </div>
  );
};
export default CreatePosts;
