// // import { Post, Loader, FriendsList, CreatePost } from "../components";
// import Loader from "../component/Loader";
// import styles from "../styles/home.module.css";
// import { useAuth, usePosts } from "../hooks";
// import { useEffect, useState } from "react";
// import { getPosts } from "../api";

// export const Home = (props) => {
//   console.log("home");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await getPosts();
//       if (response.success) {
//         setPosts(response.data.posts);
//       }

//       setLoading(false);
//     };
//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className={styles.home}>
//       <div className={styles.postsList}>
//         {/* <CreatePost /> */}
//         {/* {posts.data.map((post) => (
//           <Post post={post} key={`post-${post._id}`} />
//         ))} */}
//       </div>
//       {/* {auth.user && <FriendsList />} */}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../component/Loader";
import Post from "../component/Post";
import { getPosts } from "../api";
import styles from "../styles/home.module.css";
import { useAuth, usePosts } from "../hooks";
import FriendsList from "../component/FriendsList";
import CreatePosts from "../component/CreatePosts";
const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePosts />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
          // <div className={styles.postWrapper} key={`post-${post._id}`}>
          //   <div className={styles.postHeader}>
          //     <div className={styles.postAvatar}>
          //       <img
          //         src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          //         alt="user-pic"
          //       />
          //       <div>
          //         {/* {console.log('post.user ',post.user)} */}
          //         <Link
          //           to={{
          //             pathname: `/user/${post.user._id}`,
          //           }}
          //           state={{
          //             user: post.user,
          //           }}
          //           className={styles.postAuthor}
          //         >
          //           {post.user.name}
          //         </Link>
          //         <span className={styles.postTime}>a minute ago</span>
          //       </div>
          //     </div>
          //     <div className={styles.postContent}>{post.content}</div>

          //     <div className={styles.postActions}>
          //       <div className={styles.postLike}>
          //         <img
          //           src="https://cdn-icons-png.flaticon.com/128/2488/2488700.png"
          //           alt="likes-icon"
          //         />
          //         <span>{post.likes.length}</span>
          //       </div>

          //       <div className={styles.postCommentsIcon}>
          //         <img
          //           src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
          //           alt="comments-icon"
          //         />
          //         <span>{post.comments.length}</span>
          //       </div>
          //     </div>
          //     <div className={styles.postCommentBox}>
          //       <input placeholder="Start typing a comment" />
          //     </div>

          //     {/* <div className={styles.postCommentsList}>
          //     {post.comments.map((comment) => (
          //       <Comment comment={comment} />
          //     ))}
          //   </div> */}
          //   </div>
          // </div>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
