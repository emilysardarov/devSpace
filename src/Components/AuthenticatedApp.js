import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchPosts,
  setComments,
  setReactions,
  fetchFollowers,
  fetchFollowings,
  fetchFollowNotifications,
  fetchMessageNotifications,
  fetchConversations,
} from '../store';

import Home from './Home';
import Nav from './Global/Nav';
import PageNotFound from './Global/PageNotFound';
import DevSpace from './User/DevSpace';
import UserProfile from './User/UserProfile';
import Follows from './Relation/Follows';
import Notifications from './Notifications';
import Messenger from './Chat/Messenger';
import Search from './Search';

import { Container } from '@mui/material';

const AuthenticatedApp = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  function useInterval(callback, delay) {
    const intervalRef = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => savedCallback.current();
      if (typeof delay === 'number') {
        intervalRef.current = window.setInterval(tick, delay);
        return () => window.clearInterval(intervalRef.current);
      }
    }, [delay]);
    return intervalRef;
  }

  // BOS: For real-time async updates. Use 5s delay for demo, but impractical and won't scale up in production.
  // We can set to 1s delay for demo purposes.
  useInterval(() => {
    dispatch(fetchFollowings(auth.username));
    dispatch(fetchFollowers(auth.username));
    dispatch(fetchFollowNotifications(auth.username));
    dispatch(fetchMessageNotifications(auth.username));
  }, 30000); //1000

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(setComments());
    dispatch(setReactions());
    dispatch(fetchFollowers(auth.username));
    dispatch(fetchFollowings(auth.username));
    dispatch(fetchFollowNotifications(auth.username));
    dispatch(fetchConversations(auth.id));
    dispatch(fetchMessageNotifications(auth.username));
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:username" element={<DevSpace />} />
          <Route path="/:username/notifications" element={<Notifications />} />
          <Route path="/:username/messenger" element={<Messenger />} />
          <Route path="/user/:username/profile" element={<UserProfile />} />
          <Route path="/user/:username/follows" element={<Follows />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:filter" element={<Search />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default AuthenticatedApp;
