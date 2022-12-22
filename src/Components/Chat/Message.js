import React from 'react';
import dayjs from 'dayjs';
import { Avatar, Typography } from '@mui/material';

const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '10px',
          }}
        >
          <Avatar
            src={message?.sender?.profilePic}
            sx={{
              width: 32,
              height: 32,
              boxShadow: 2,
              objectFit: 'cover',
            }}
          />
          <Typography variant="subtitle2">
            {message?.sender?.username}
          </Typography>
        </div>
        <Typography className="messageText">{message?.text}</Typography>
      </div>

      <Typography variant="subtitle2" mt={1}>
        {dayjs(message?.createdAt).fromNow()}
      </Typography>
    </div>
  );
};

export default Message;
