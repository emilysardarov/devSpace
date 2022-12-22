import React, { useEffect, useState } from 'react';
import CodeSnippet from './CodeSnippet';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import CreateComment from './CreateComment';
import EditPost from './EditPost';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, fetchPosts } from '../../store';
import Comment from './Comment';
import UserBadge from '../User/UserBadge';
import Reaction from './Reaction';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = (props) => {
  const dispatch = useDispatch();
  const { auth, posts, comments, reactions } = useSelector((state) => state);
  const postComments = comments.filter(
    (comment) => comment.postId === props.post
  );
  const postReactions = reactions.filter(
    (reaction) => reaction.postId === props.post
  );
  const userId = auth.id;
  const userPost = props.userId;
  const { updatedAt } = props;
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [posts]);

  const showEditForm = () => {
    setShowForm(true);
  };

  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = (event) => {
    setAnchorEl(event.currentTarget);
    showEditForm();
  };
  const handleDelete = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(deletePost(props.post));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <UserBadge
              username={props.username}
              profilePic={props.profilePic}
              updatedAt={updatedAt}
            />
          </Grid>
          {userId === userPost ? (
            <Grid item justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconButton
                  size="small"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </Grid>
              {showForm ? (
                <EditPost
                  onClose={() => {
                    setShowForm(false);
                    handleClose();
                  }}
                  id={props.post}
                  text={props.text}
                  code={props.code}
                  mediaUrl={props.mediaUrl}
                />
              ) : null}
            </Grid>
          ) : null}
        </Grid>

        <h3>{props.user}</h3>

        {props.text ? <p>{props.text}</p> : null}
        {props.code ? <CodeSnippet value={props.code} /> : null}
        {!!props.mediaUrl && (
          <>
            <Divider
              style={{ width: '108%', marginLeft: '-17', marginRight: '-20' }}
            />
            <CardMedia
              component="img"
              src={`${props.mediaUrl}`}
              style={{ width: '108%', marginLeft: '-17', marginRight: '-20' }}
            />
            <Divider
              style={{ width: '108%', marginLeft: '-17', marginRight: '-20' }}
            />
          </>
        )}
        <Box mt={1} mb={-1} spacing={3}>
          <Reaction postId={props.post} />
          <CreateComment postId={props.post} />
        </Box>
        {/* {postComments.map((comment) => {
            return (
              <Stack key={comment.id}>
                <Comment
                  key={comment.id}
                  commentId={comment.id}
                  userId={comment.userId}
                  username={comment.user.username}
                  comment={comment.commentText}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  postId={props.post}
                  profilePic={comment.user.profilePic}
                />
              </Stack>
            );
          })} */}
      </CardContent>
    </Card>
  );
};

export default Post;
