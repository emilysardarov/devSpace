import axios from 'axios';

const followers = (state = [], action) => {
  if (action.type === 'SET_FOLLOWERS') {
    return action.followers;
  }
  if (action.type === 'CREATE_FOLLOWER') {
    return [...state, action.follower];
  }

  return state;
};

const _fetchFollowers = (followers) => {
  return {
    type: 'SET_FOLLOWERS',
    followers,
  };
};

export const fetchFollowers = (username) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/relations/${username}/followers`);
    dispatch(_fetchFollowers(response.data));
  };
};

export default followers;
