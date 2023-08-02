import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const CustomFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  //   console.log("token does not exist", token);
  const config = {
    ...customConfig,
    headers: { ...headers, ...customConfig.headers },
  };
  if (body) {
    config.body = getFormBody(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    // console.error("error");
    return {
      message: err.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return CustomFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};

export const login = (email, password) => {
  return CustomFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const register = async (name, email, password, confirm_password) => {
  // console.log("api  :  " + name, email, password, confirm_password);
  return CustomFetch(API_URLS.signUp(), {
    method: "POST",
    body: { name, email, password, confirm_password },
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  // console.log("api  :  " + name, userId, password, confirm_password);
  return CustomFetch(API_URLS.editUser(), {
    method: "POST",
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const fetchUserProfile = (userId) => {
  return CustomFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

export const fetchUserFriends = () => {
  return CustomFetch(API_URLS.friends(), {
    method: "GET",
  });
};

export const addFriend = (userId) => {
  return CustomFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

export const removeFriend = (userId) => {
  return CustomFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};

export const addPosts = (content) => {
  return CustomFetch(API_URLS.createPost(), {
    method: "POST",
    body: {
      content,
    },
  });
};

export const createComment = async (content, postId) => {
  return CustomFetch(API_URLS.comment(), {
    method: "POST",
    body: {
      post_id: postId,
      content,
    },
  });
};

export const toggleLike = (itemId, itemType) => {
  return CustomFetch(API_URLS.toggleLike(itemId, itemType), {
    method: "POST",
  });
};

export const searchUser = (searchText) => {
  return CustomFetch(API_URLS.searchUsers(searchText), {
    method: "GET",
  });
};
