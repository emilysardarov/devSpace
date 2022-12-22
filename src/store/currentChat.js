const currentChat = (state = null, action) => {
  if (action.type === 'SET_CURRENT_CHAT') {
    return action.conversation;
  }
  return state;
};

const _setCurrentChat = (conversation) => {
  return {
    type: 'SET_CURRENT_CHAT',
    conversation,
  };
};

export const setCurrentChat = (conversation) => {
  return async (dispatch) => {
    dispatch(_setCurrentChat(conversation));
  };
};

export default currentChat;
