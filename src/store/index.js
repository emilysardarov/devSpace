import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import posts from './posts';
import user from './user';
import comments from './comments';
import reactions from './reactions';
import followers from './followers';
import followings from './followings';
import notifications from './notifications';
import conversations from './conversations';
import messages from './messages';
import currentChat from './currentChat';
import messageNotifications from './messageNotifications';

const reducer = combineReducers({
  auth,
  posts,
  user,
  comments,
  reactions,
  followers,
  followings,
  notifications,
  conversations,
  messages,
  currentChat,
  messageNotifications,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './posts';
export * from './user';
export * from './comments';
export * from './reactions';
export * from './followers';
export * from './followings';
export * from './notifications';
export * from './conversations';
export * from './messages';
export * from './currentChat';
export * from './messageNotifications';
