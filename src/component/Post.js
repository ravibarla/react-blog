import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";

import { createComment, toggleLike } from "../api";
import { usePosts } from "../hooks";
import styles from "../styles/home.module.css";
import Comment from "./Comment";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  //   const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        toast.success("Comment created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the toast automatically after 3 seconds
          // hideProgressBar: false, // Show the progress bar
          // pauseOnHover: true, // Pause the toast timer on hover,
        });
        // addToast("Comment created successfully!", {
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

      setCreatingComment(false);
    }
  };

  const handlePotsLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");
    if (response.success) {
      if (response.data.deleted) {
        toast.success("Like removed successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the toast automatically after 3 seconds
          // hideProgressBar: false, // Show the progress bar
          // pauseOnHover: true, // Pause the toast timer on hover,
        });
      } else {
        toast.success("Like added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the toast automatically after 3 seconds
          // hideProgressBar: false, // Show the progress bar
          // pauseOnHover: true, // Pause the toast timer on hover,
        });
      }
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast automatically after 3 seconds
        // hideProgressBar: false, // Show the progress bar
        // pauseOnHover: true, // Pause the toast timer on hover,
      });
    }
  };
  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
            alt="user-pic"
          />
          <div>
            {/* {console.log('post.user ',post.user)} */}
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
              }}
              state={{
                user: post.user,
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePotsLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2488/2488700.png"
                alt="likes-icon"
              />
            </button>

            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
