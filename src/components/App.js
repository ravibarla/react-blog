import { Routes, Route } from 'react-router-dom';
// import { PostDetail, CreatePost, Home } from './index';
import PostDetail from './PostDetail';
import Home from './Home';
import CreatePost from './CreatePost';
import Navbar from './Navbar';
function App() {
  return (
    <div className="container">
      <Navbar/>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/post/:postId" Component={PostDetail} />
        <Route exact path="/create-post" Component={CreatePost} />
      </Routes>
    </div>
  );
}

export default App;
