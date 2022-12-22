import axios from 'axios';

const followings = (state = [], action) => {
  if (action.type === 'SET_FOLLOWINGS') {
    return action.followings;
  }
  if (action.type === 'CREATE_FOLLOWING') {
    return [...state, action.following];
  }
  if (action.type === 'DELETE_FOLLOWING') {
    return state.filter((following) => following.id !== action.id);
  }
  return state;
};

const _fetchFollowings = (followings) => {
  return {
    type: 'SET_FOLLOWINGS',
    followings,
  };
};

const _createFollowing = (following) => {
  return {
    type: 'CREATE_FOLLOWING',
    following,
  };
};

const _deleteFollowing = (id) => {
  return {
    type: 'DELETE_FOLLOWING',
    id,
  };
};

export const fetchFollowings = (username) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/relations/${username}/followings`);
    dispatch(_fetchFollowings(response.data));
  };
};

export const createFollowing = (relation) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/relations/follow/`, relation);
    dispatch(_createFollowing(response.data));
  };
};

export const deleteFollowing = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/relations/unfollow/${id}`);
    dispatch(_deleteFollowing(id));
  };
};

export default followings;
