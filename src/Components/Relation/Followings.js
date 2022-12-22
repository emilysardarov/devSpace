import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Typography, Avatar, Box, Divider } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';

const Followings = () => {
  const { followings } = useSelector((state) => state);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Followings <PeopleIcon />
      </Typography>
      <Box sx={{ maxHeight: 500, overflow: 'hidden', overflowY: 'scroll' }}>
        {followings.map((following) => {
          return (
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Link to={`/${following.username}`} className="user-link">
                  <Avatar
                    src={following.profilePic}
                    sx={{
                      width: 50,
                      height: 50,
                      boxShadow: 2,
                    }}
                  >
                    {following.firstName
                      ?.substring(0, 1)
                      .toUpperCase()
                      .concat(
                        following.lastName?.substring(0, 1).toUpperCase()
                      )}
                  </Avatar>
                </Link>
              </Grid>
              <Grid item>
                <Link to={`/${following.username}`} className="user-link">
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
                    {following.username}
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
              <Divider
                style={{
                  width: '100%',
                  marginTop: '10',
                  marginBottom: '10',
                }}
              />
            </Grid>
          );
        })}
      </Box>
    </div>
  );
};

export default Followings;
