import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, setComments } from '../store';
import { styled } from '@mui/material/styles';
import { Grid, Paper } from '@mui/material';
import InfoPanel from './InfoPanel/InfoPanel';
import Posts from './Post/Posts';
import LabTabs from './Post/PostForm';
import ChatFollowPanel from './ChatFollowPanel';

const StyledPaper = styled(Paper)(({}) => ({
  color: 'primary',
  padding: 8,
  backgroundColor: 'blue',
  border: '1px solid black',
}));

const Home = () => {
  const { auth } = useSelector((state) => state);
  const { posts, comments } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts);
    dispatch(setComments);
  }, [posts, comments]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3} className={'sideLeft'}>
        <Paper sx={{ minHeight: { sm: 'auto', md: '88vh' }, p: 2 }}>
          <InfoPanel />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} className={'center'}>
        <LabTabs />
        <Posts posts={posts} username={null} />
      </Grid>

      <Grid item xs={12} md={3} className={'sideRight'}>
        <Paper sx={{ height: { sm: 'auto', md: '88vh' }, p: 2 }}>
          <ChatFollowPanel />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
