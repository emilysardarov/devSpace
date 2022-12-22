import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, setComments } from '../store';
import InfoPanel from './InfoPanel/InfoPanel';
import Posts from './Post/Posts';
import { styled } from '@mui/material/styles';
import { Grid, Paper } from '@mui/material';
import LabTabs from './Post/PostForm';
import ChatFollowPanel from './ChatFollowPanel';

const StyledPaper = styled(Paper)(({}) => ({
  color: 'primary',
  padding: 8,
  backgroundColor: 'blue',
  border: '1px solid black',
}));

const Search = () => {
  const { auth } = useSelector((state) => state);
  const { posts, comments } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { filter } = useParams();

  const filteredSearch = posts.filter(
    (post) =>
      !filter ||
      post.text?.toLowerCase().includes(filter.toLowerCase()) ||
      post.code?.toLowerCase().includes(filter.toLowerCase())
  );
  // const commentSearch = comments.filter(
  //   (comment) =>
  //     !filter ||
  //     comment.comentText?.toLowerCase().includes(filter.toLowerCase())
  // );

  //const filteredSearch = [...postSearch, ...commentSearch];

  useEffect(() => {
    dispatch(fetchPosts);
    dispatch(setComments);
  }, [posts, comments, filter]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ minHeight: { sm: 'auto', md: '88vh' }, p: 2 }}>
          <InfoPanel />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <LabTabs />
        <Posts posts={filteredSearch} username={null} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ height: { sm: 'auto', md: '88vh' }, p: 2 }}>
          <ChatFollowPanel />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Search;
