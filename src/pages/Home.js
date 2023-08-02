import Loader from "../component/Loader";
import Post from "../component/Post";

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
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
