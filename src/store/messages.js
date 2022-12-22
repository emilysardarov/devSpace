import axios from 'axios';

const messages = (state = [], action) => {
  if (action.type === 'SET_MESSAGES') {
    return action.messages;
  }
  if (action.type === 'CREATE_MESSAGE') {
    return [...state, action.message];
  }

  return state;
};

const _fetchMessages = (messages) => {
  return {
    type: 'SET_MESSAGES',
    messages,
  };
};

const _createMessage = (message) => {
  return {
    type: 'CREATE_MESSAGE',
    message,
  };
};

export const fetchMessages = (chatId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/messages/${chatId}`);
    dispatch(_fetchMessages(response.data));
  };
};

export const createMessage = (message) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/messages`, message);
    dispatch(_createMessage(response.data));
  };
};

export default messages;
