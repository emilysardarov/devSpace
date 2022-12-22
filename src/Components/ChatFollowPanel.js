import React from 'react';
import Followings from './Relation/Followings';
import Conversations from './Chat/Conversations';
import { Divider } from '@mui/material';
const ChatFollowPanel = () => {
  return (
    <div>
      <Followings style={{ marginBottom: '20px' }} />
      <Divider
        style={{
          width: 0,
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      />
      <Conversations />
    </div>
  );
};

export default ChatFollowPanel;
