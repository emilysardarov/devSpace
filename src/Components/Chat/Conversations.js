import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentChat } from '../../store';

import { io } from 'socket.io-client';
import { Typography, Divider, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Conversation from './Conversation';
const Conversations = () => {
  const { auth, conversations } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('https://dev-space.herokuapp.com');
    /* socket.current = io('ws://localhost:3000'); */
    /* socket.current = io('ws://localhost:8900'); */ //if useing cors
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', auth.id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users.map((user) => user.userId));
    });
  }, [auth]);

  return (
    <>
      <Typography variant="h4" mb={2}>
        Recent Chats <ChatIcon />
      </Typography>
      <Box sx={{ maxHeight: 500, overflow: 'hidden', overflowY: 'scroll' }}>
        {conversations?.map((c, idx) => {
          return (
            <div
              onClick={() => {
                if (pathname === '/') {
                  navigate(`/${auth.username}/messenger`);
                }
                dispatch(setCurrentChat(c));
              }}
              style={{ cursor: 'pointer' }}
              key={idx}
            >
              <Conversation
                conversation={c}
                currentUser={auth.id}
                onlineUsers={onlineUsers}
              />
              <Divider
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              />
            </div>
          );
        })}
      </Box>
    </>
  );
};
export default Conversations;
