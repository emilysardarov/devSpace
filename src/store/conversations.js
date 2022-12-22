import axios from 'axios';

const conversations = (state = [], action) => {
  if (action.type === 'SET_CONVERSATIONS') {
    return action.conversations;
  }
  if (action.type === 'CREATE_CONVERSATION') {
    return [...state, action.conversation];
  }

  return state;
};

const _fetchConversations = (conversations) => {
  return {
    type: 'SET_CONVERSATIONS',
    conversations,
  };
};

const _createConversation = (conversation) => {
  return {
    type: 'CREATE_CONVERSATION',
    conversation,
  };
};

export const fetchConversations = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/conversations/${id}`);
    dispatch(_fetchConversations(response.data));
  };
};

export const createConversation = (conversation) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/conversations`, conversation);
    dispatch(_createConversation(response.data));
  };
};

export default conversations;
