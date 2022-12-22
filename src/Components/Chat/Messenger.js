import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMessages,
  createMessage,
  setCurrentChat,
  createMessageNotification,
  deleteMessageNotifications,
  fetchMessageNotifications,
} from '../../store';

import { io } from 'socket.io-client';
import {
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
  Divider,
  Box,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversation';
import Message from './Message';

const Messenger = () => {
  const { auth, conversations, messages, currentChat } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState(''); //input
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();

  /*  ------- web socket -------   */

  //console.log(socket);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    dispatch(deleteMessageNotifications(auth.id));
    // Fetch immediately instead of wait for the 5 second poll.
    // No need to make the poll clock faster for follow notif.
    dispatch(fetchMessageNotifications(auth.id));
  }, []);

  useEffect(() => {
    socket.current = io('https://dev-space.herokuapp.com');
    /* socket.current = io('ws://localhost:3000'); */
    /* socket.current = io('ws://localhost:8900'); */ //if useing cors
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      dispatch(fetchMessages(currentChat.id));
  }, [arrivalMessage, currentChat, newMessage]);
  //setMessages((prev) => [...prev, arrivalMessage]);

  useEffect(() => {
    socket.current.emit('addUser', auth.id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users.map((user) => user.userId));
    });
  }, [auth]);

  // console.log(onlineUsers);

  /* useEffect(() => {
    socket?.on('welcome', (message) => {
      console.log(message);
    });
  }, [socket]); */

  /*  ------- end of web socket -------   */

  //debounce
  useEffect(() => {
    if (currentChat) {
      const debounce = setTimeout(() => {
        dispatch(deleteMessageNotifications(auth.id));
        dispatch(fetchMessages(currentChat.id));
      }, 500);

      return () => clearTimeout(debounce);
    }
  }, [currentChat, newMessage]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const message = {
      senderId: auth.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.members.find((member) => member !== auth.id);

    socket.current.emit('sendMessage', {
      senderId: auth.id,
      receiverId: receiverId,
      text: newMessage,
    });

    dispatch(createMessage(message));
    //reset
    setNewMessage('');

    const messageNotification = {
      type: 'message',
      userId: receiverId,
      actingUserId: auth.id,
    };
    dispatch(createMessageNotification(messageNotification));
    dispatch(fetchMessageNotifications(auth.id));
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Paper sx={{ height: { sm: 'auto', md: '88vh' }, p: 2 }}>
          <Typography variant="h4" mb={2}>
            Recent Chats
          </Typography>
          <Box sx={{ maxHeight: 500, overflow: 'hidden', overflowY: 'scroll' }}>
            {conversations?.map((c, idx) => {
              return (
                <div
                  onClick={() => dispatch(setCurrentChat(c))}
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
        </Paper>
      </Grid>

      <Grid item xs={12} sm={9}>
        <Paper
          style={{
            padding: 20,
            height: '87.5vh',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {!currentChat ? (
            <Typography
              style={{
                fontSize: '2.5rem',
                color: '#E0DCDC',
                textAlign: 'center',
                marginTop: '2rem',
              }}
            >
              Open a Conversation to Start a Chat
              <div>
                <img
                  alt=""
                  src="../../static/img/chat_placeholder.svg"
                  width="60%"
                  maxWidth="600px"
                />
              </div>
            </Typography>
          ) : (
            <>
              <Typography
                style={{
                  fontSize: '1.5rem',
                  color: '#E0DCDC',
                  textAlign: 'center',
                }}
              ></Typography>
              <div
                style={{
                  height: '65%',
                  overflowY: 'scroll',
                  paddingRight: '2rem',
                }}
              >
                {messages.map((m, idx) => (
                  <div ref={scrollRef} key={idx}>
                    <Message message={m} own={m.senderId === auth.id} />
                  </div>
                ))}
              </div>
              <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
              <Grid
                container
                spacing={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid item xs={9}>
                  <TextField
                    multiline
                    maxRows={6}
                    id="outlined-multiline-flexible"
                    placeholder="write something..."
                    onChange={(ev) => setNewMessage(ev.target.value)}
                    value={newMessage}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    style={{ width: '100%' }}
                  >
                    Send <SendIcon style={{ marginLeft: '5px' }} />
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Messenger;
