import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../Global/Sidebar';
import {
  deleteFollowing,
  createFollowing,
  fetchFollowings,
  fetchFollowNotifications,
  createFollowNotification,
  createConversation,
  setCurrentChat,
} from '../../store';
import {
  Container,
  Box,
  Grid,
  Typography,
  Avatar,
  Fade,
  Paper,
  Button,
} from '@mui/material';

const Follows = () => {
  const { followers, followings, auth, conversations } = useSelector(
    (state) => state
  );
  //console.log(conversations);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Sidebar url={'follows'} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper sx={{ minHeight: '92vh' }} elevation={5}>
          <Container component="main" justify="center">
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <br /> <br />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ margin: '0 20px 0 40px' }}
                  >
                    Followers
                  </Typography>
                  <br /> <br />
                  <Fade in={true} {...{ timeout: 1000 }}>
                    <Grid container spacing={6}>
                      {followers.map((follower) => {
                        const following = followings.find(
                          (following) => following.userId === follower.userId
                        );
                        return (
                          <Grid
                            item
                            key={follower.id}
                            xs={12}
                            sm={12}
                            sx={{ margin: '0 20px 0 40px' }}
                          >
                            <Grid
                              container
                              spacing={1}
                              boxShadow={1}
                              borderRadius={1}
                            >
                              <Grid item xs={12} sm={3}>
                                <Avatar
                                  src={follower.profilePic}
                                  sx={{
                                    width: 80,
                                    height: 80,
                                  }}
                                >
                                  {follower.firstName
                                    ?.substring(0, 1)
                                    .toUpperCase()
                                    .concat(
                                      follower.lastName
                                        ?.substring(0, 1)
                                        .toUpperCase()
                                    )}
                                </Avatar>
                              </Grid>
                              <Grid item xs={12} sm={9}>
                                <p>
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
                                    <span>{follower.username}</span>
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
                                </p>
                                <p>
                                  {follower.firstName?.concat(
                                    ' ',
                                    follower.lastName
                                  )}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Button
                                  variant="contained"
                                  component={Link}
                                  to={`/${follower.username}`}
                                >
                                  View
                                </Button>
                                <Button
                                  sx={{ margin: 2 }}
                                  onClick={() => {
                                    const conversation = {
                                      senderId: auth.id,
                                      receiverId: follower?.userId,
                                    };

                                    const existingConv = conversations.find(
                                      (conversation) => {
                                        return conversation.members.includes(
                                          follower?.userId
                                        );
                                      }
                                    );
                                    if (existingConv) {
                                      dispatch(setCurrentChat(existingConv));
                                    } else {
                                      dispatch(
                                        createConversation(conversation)
                                      );
                                      dispatch(setCurrentChat(conversation));
                                    }
                                  }}
                                  variant="contained"
                                  component={Link}
                                  to={`/${auth.username}/messenger`}
                                >
                                  Chat
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    const relation = {
                                      userSource: auth.id,
                                      userTarget: follower.userId,
                                    };
                                    dispatch(createFollowing(relation));
                                    dispatch(fetchFollowings(auth.username));
                                    const notification = {
                                      userId: follower.userId,
                                      type: 'follow',
                                      actingUserId: auth.id,
                                    };
                                    dispatch(
                                      createFollowNotification(notification)
                                    );
                                    dispatch(
                                      fetchFollowNotifications(auth.username)
                                    );
                                  }}
                                  disabled={following ? true : false}
                                >
                                  Follow
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Fade>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <br /> <br />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ margin: '0 20px 0 40px' }}
                  >
                    Followings
                  </Typography>
                  <br /> <br />
                  <Fade in={true} {...{ timeout: 1000 }}>
                    <Grid container spacing={6}>
                      {followings.map((following) => {
                        return (
                          <Grid
                            item
                            key={following.id}
                            xs={12}
                            sm={12}
                            sx={{ margin: '0 40px 0 40px' }}
                          >
                            <Grid
                              container
                              spacing={1}
                              boxShadow={1}
                              borderRadius={1}
                            >
                              <Grid item xs={12} sm={3}>
                                <Avatar
                                  src={following.profilePic}
                                  sx={{
                                    width: 80,
                                    height: 80,
                                  }}
                                >
                                  {following.firstName
                                    ?.substring(0, 1)
                                    .toUpperCase()
                                    .concat(
                                      following.lastName
                                        ?.substring(0, 1)
                                        .toUpperCase()
                                    )}
                                </Avatar>
                              </Grid>
                              <Grid item xs={12} sm={9}>
                                <p>
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
                                    <span>{following.username}</span>
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
                                </p>
                                <p>
                                  {following.firstName?.concat(
                                    ' ',
                                    following.lastName
                                  )}{' '}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Button
                                  variant="contained"
                                  component={Link}
                                  to={`/${following.username}`}
                                >
                                  View
                                </Button>
                                <Button
                                  sx={{ margin: 2 }}
                                  onClick={() => {
                                    const conversation = {
                                      senderId: auth.id,
                                      receiverId: following.userId,
                                    };

                                    const existingConv = conversations.find(
                                      (conversation) => {
                                        return conversation.members.includes(
                                          following.userId
                                        );
                                      }
                                    );
                                    if (existingConv) {
                                      dispatch(setCurrentChat(existingConv));
                                    } else {
                                      dispatch(
                                        createConversation(conversation)
                                      );
                                      dispatch(setCurrentChat(conversation));
                                    }
                                  }}
                                  variant="contained"
                                  component={Link}
                                  to={`/${auth.username}/messenger`}
                                >
                                  Chat
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    dispatch(deleteFollowing(following.id));
                                  }}
                                >
                                  Unfollow
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Fade>
                </Grid>
              </Grid>
              <br /> <br />
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Follows;
