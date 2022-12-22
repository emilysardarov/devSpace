import React, { useEffect } from 'react';
import { Grid, Typography, Divider, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFollowNotification } from '../store/';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Link } from 'react-router-dom';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state);

  return (
    <div>
      <Typography variant="h5" style={{ padding: '20px' }}>
        Notifications
      </Typography>
      <Divider />
      <Grid
        container
        spacing={1}
        sx={{ width: '350px', paddingLeft: '20px', paddingRight: '20px' }}
      >
        {notifications.length === 0 ? (
          <div>
            <Typography variant="body1" style={{ padding: '20px 0 20px 10px' }}>
              You have no notifications
            </Typography>
          </div>
        ) : (
          ''
        )}
        {notifications.map((notification) => {
          const createdDt = new Date(notification.createdAt);
          return (
            <Grid item key={notification.id} xs={12} sm={12}>
              <Grid container alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={12} sm={3}>
                  <Link to={`/${notification.username}`} className="user-link">
                    <Avatar
                      src={notification.profilePic}
                      sx={{
                        width: 60,
                        height: 60,
                      }}
                    >
                      {notification.firstName
                        ?.substring(0, 1)
                        .toUpperCase()
                        .concat(
                          notification.lastName?.substring(0, 1).toUpperCase()
                        )}
                    </Avatar>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <p>
                    <Link
                      to={`/${notification.username}`}
                      className="user-link"
                    >
                      <strong>
                        <span
                          style={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            color: '#ff9500',
                          }}
                        >
                          &lt;{' '}
                        </span>
                        <span>{notification.username}</span>
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
                      </strong>
                    </Link>

                    <span> {'followed you'} </span>
                  </p>
                  <p> {dayjs().to(dayjs(createdDt))} </p>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <ClearRoundedIcon
                    variant="contained"
                    onClick={() => {
                      dispatch(deleteFollowNotification(notification.id));
                    }}
                  ></ClearRoundedIcon>
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Notifications;
