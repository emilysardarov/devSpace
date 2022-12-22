import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchUser,
  createFollowing,
  fetchFollowings,
  fetchFollowNotifications,
  createFollowNotification,
  fetchPosts,
} from '../../store';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import avatarDefault from '../../../static/img/avatar-default.jpeg';
import Posts from '../Post/Posts';

const DevSpace = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { posts, user, auth, followings } = useSelector((state) => state);
  const following = followings.find(
    (following) => following.userId === user.id
  );
  let filteredPosts = posts?.filter((post) => post.user.username === username);
  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(fetchPosts());
  }, [username]);

  const x = user?.topics;
  console.log('TOPICS', x);
  console.log('TOPICS', typeof x);
  const y = x?.join();
  console.log('TOPICS-y', y);

  return (
    <Grid container spacing={3} sx={{ height: 'auto' }}>
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{ minHeight: { xs: 'auto', sm: '88vh' }, p: 2 }}
          elevation={5}
        >
          <Container component="main" justify="center">
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2} direction="row" justify="center">
                    <Grid item xs={12} sm={12}>
                      <br />
                      <Avatar
                        src={user.profilePic ? user.profilePic : avatarDefault}
                        sx={{
                          width: 150,
                          height: 150,
                          borderRadius: '50%',
                          marginLeft: '30%',
                          resizeMode: 'center',
                          boxShadow: 2,
                        }}
                      />
                      <br />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Username
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        First Name
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.firstName}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Last Name
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        GitHub ID
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.githubUsername}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Location
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Bio
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.bio}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Interests
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                        {user.topics?.join(', ')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              {auth.id === user.id && (
                <Button
                  variant="contained"
                  component={Link}
                  to={`/user/${user.username}/profile`}
                >
                  Edit
                </Button>
              )}
              {auth.id !== user.id && (
                <Button
                  variant="contained"
                  onClick={() => {
                    const relation = {
                      userSource: auth.id,
                      userTarget: user.id,
                    };
                    dispatch(createFollowing(relation));
                    dispatch(fetchFollowings(auth.username));
                    const notification = {
                      userId: user.id,
                      type: 'follow',
                      actingUserId: auth.id,
                    };
                    dispatch(createFollowNotification(notification));
                    dispatch(fetchFollowNotifications(auth.username));
                  }}
                  disabled={following ? true : false}
                >
                  Follow
                </Button>
              )}
              <br /> <br />
            </Box>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        {filteredPosts.length ? (
          <Paper
            sx={{ minHeight: { xs: 'auto', sm: '82vh' }, p: 2 }}
            elevation={5}
          >
            <Posts username={username} posts={filteredPosts} />
          </Paper>
        ) : (
          <Paper
            sx={{ minHeight: { xs: 'auto', sm: '88vh' }, p: 2 }}
            elevation={5}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              alt=""
              src="../../static/img/devSpace_placeholder.svg"
              width="40%"
            />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default DevSpace;
