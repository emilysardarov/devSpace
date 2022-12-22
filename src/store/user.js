import axios from 'axios';

const user = (state = [], action) => {
  if (action.type === 'SET_USER') {
    return action.user;
  }

  if (action.type === 'CREATE_USER') {
    return [...state, action.user];
  }
  if (action.type === 'UPDATE_USER') {
    return state.map((user) =>
      user.id === action.user.id ? action.user : user
    );
  }
  return state;
};

const _fetchUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  };
};

const _createUser = (user) => {
  return {
    type: 'CREATE_USER',
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export const fetchUser = (username) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/users/${username}`);
    dispatch(_fetchUser(response.data));
  };
};

export const getUsername = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/users/getUsername/${id}`);
    dispatch(_fetchUser(response.data));
  };
};
export default user;
