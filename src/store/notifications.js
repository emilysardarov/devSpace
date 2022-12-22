import axios from 'axios';

const notifications = (state = [], action) => {
  if (action.type === 'SET_FOLLOW_NOTIFS') {
    return action.notifications;
  }
  if (action.type === 'CREATE_FOLLOW_NOTIF') {
    return [...state, action.notification];
  }
  if (action.type === 'DELETE_FOLLOW_NOTIF') {
    return state.filter((notification) => notification.id !== action.id);
  }
  return state;
};

const _fetchFollowNotifications = (notifications) => {
  return {
    type: 'SET_FOLLOW_NOTIFS',
    notifications,
  };
};

const _createFollowNotification = (notification) => {
  return {
    type: 'CREATE_FOLLOW_NOTIF',
    notification,
  };
};

const _deleteFollowNotification = (id) => {
  return {
    type: 'DELETE_FOLLOW_NOTIF',
    id,
  };
};

export const fetchFollowNotifications = (username) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/notifications/follow/${username}`);
    dispatch(_fetchFollowNotifications(response.data));
  };
};

export const createFollowNotification = (notification) => {
  return async (dispatch) => {
    const response = await axios.post(
      `/api/notifications/follow`,
      notification
    );
    dispatch(_createFollowNotification(response.data));
  };
};

export const deleteFollowNotification = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/notifications/follow/${id}`);
    dispatch(_deleteFollowNotification(id));
  };
};

export default notifications;
