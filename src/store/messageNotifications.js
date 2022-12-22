import axios from 'axios';

const messageNotifications = (state = [], action) => {
  if (action.type === 'SET_MESSAGE_NOTIFS') {
    return action.messageNotifications;
  }
  if (action.type === 'CREATE_MESSAGE_NOTIF') {
    return [...state, action.messageNotification];
  }
  if (action.type === 'DELETE_MESSAGE_NOTIF') {
    return state.filter((notification) => notification.userId !== action.id);
  }
  return state;
};

const _fetchMessageNotifications = (messageNotifications) => {
  return {
    type: 'SET_MESSAGE_NOTIFS',
    messageNotifications,
  };
};

const _createMessageNotification = (messageNotification) => {
  return {
    type: 'CREATE_MESSAGE_NOTIF',
    messageNotification,
  };
};

const _deleteMessageNotification = (id) => {
  return {
    type: 'DELETE_MESSAGE_NOTIF',
    id,
  };
};

export const fetchMessageNotifications = (username) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/notifications/message/${username}`);
    dispatch(_fetchMessageNotifications(response.data));
  };
};

export const createMessageNotification = (messageNotification) => {
  return async (dispatch) => {
    const response = await axios.post(
      `/api/notifications/message`,
      messageNotification
    );
  };
};

export const deleteMessageNotifications = (userId) => {
  return async (dispatch) => {
    await axios.delete(`/api/notifications/message/${userId}`);
    dispatch(_deleteMessageNotification(userId));
  };
};

export default messageNotifications;
