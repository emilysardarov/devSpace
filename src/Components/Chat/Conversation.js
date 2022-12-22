import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Badge } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({}) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 0,
    margin: 6,
    /* border: `2px solid ${theme.palette.background.paper}` */
  },
}));

const Conversation = ({ conversation, currentUser, onlineUsers }) => {
  const [user, setUser] = useState(null);
  const friendId = conversation.members.find(
    (member) => member !== currentUser
  );
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(`/api/users/user/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <Grid container spacing={1} style={{ alignItems: 'center' }}>
      <Grid item>
        <StyledBadge
          color="secondary"
          variant="dot"
          invisible={!onlineUsers.includes(friendId)}
        >
          <Avatar
            src={user?.profilePic}
            sx={{
              width: 50,
              height: 50,
              boxShadow: 2,
            }}
          />
        </StyledBadge>
      </Grid>
      <Grid item>
        <span
          style={{
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#ff9500',
          }}
        >
          &lt;{' '}
        </span>

        <span style={{ fontWeight: 500, fontSize: '1.125rem' }}>
          {user?.username}
        </span>

        <span
          style={{
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#ff9500',
          }}
        >
          {' '}
          /&gt;
        </span>
      </Grid>
    </Grid>
  );
};

export default Conversation;
