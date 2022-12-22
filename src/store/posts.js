import axios from 'axios';

const posts = (state = [], action) => {
  if (action.type === 'SET_POSTS') {
    return action.posts;
  }
  if (action.type === 'CREATE_POST') {
    return [action.post, ...state];
  }
  if (action.type === 'EDIT_POST') {
    return state.map((post) =>
      post.id === action.post.id ? action.post : post
    );
  }
  if (action.type === 'DELETE_POST') {
    return state.filter((post) => post.id !== action.post);
  }
  return state;
};

const setPosts = (posts) => {
  return {
    type: 'SET_POSTS',
    posts,
  };
};

const addPost = (post) => {
  return {
    type: 'CREATE_POST',
    post,
  };
};

const editPost = (post) => {
  return {
    type: 'EDIT_POST',
    post,
  };
};

const removePost = (post) => {
  return {
    type: 'DELETE_POST',
    post,
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/posts');
    dispatch(setPosts(response.data));
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    const response = await axios.post('/api/posts', post);
    dispatch(addPost(response.data));
  };
};

export const updatePost = (post) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/posts/${post.id}`, post);
    dispatch(editPost(response.data));
  };
};

export const deletePost = (post) => {
  return async (dispatch) => {
    await axios.delete(`/api/posts/${post}`);
    dispatch(removePost(post));
  };
};

export default posts;
