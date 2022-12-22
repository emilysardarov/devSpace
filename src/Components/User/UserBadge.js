import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Typography, Avatar } from '@mui/material';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const UserBadge = ({ updatedAt, username, profilePic }) => {
  return (
    <Grid container spacing={1.5} style={{ alignItems: 'center' }}>
      <Grid item>
        <Link to={`/${username}`} className="user-link">
          <Avatar
            src={profilePic}
            sx={{
              width: 50,
              height: 50,
              boxShadow: 2,
            }}
          ></Avatar>
        </Link>
      </Grid>
      <Grid item>
        <Grid item>
          <Link to={`/${username}`} className="user-link">
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
              {username}
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
          </Link>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2" mt={0.5}>
            {dayjs(updatedAt).fromNow()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBadge;
