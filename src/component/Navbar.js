import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { searchUser } from "../api";

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await searchUser(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };
    if (searchText.length > 2) {
      fetchUser();
    } else {
      setResults([]);
    }
  }, [searchText]);
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/128/8915/8915520.png"
          alt=""
        />
        <input
          placeholder="search user"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                  onClick={() => {
                    setSearchText("");
                  }}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
                      alt=""
                    />

                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}
      </div>
      <div className={styles.navLinks}>
        <ul>
          {auth.user ? (
            <>
              <li>
                <button onClick={auth.logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
