import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { createComment } from '../../store';
import {
  Button,
  Box,
  TextField,
  Popover,
  Grid,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

const CreateComment = (props) => {
  const dispatch = useDispatch();
  const { auth, comments } = useSelector((state) => state);
  const [commentText, setCommentText] = useState('');
  const userId = auth.id;
  const { postId } = props;

  const postComments = comments.filter((comment) => comment.postId === postId);
  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const create = async (e) => {
    e.preventDefault();
    const newComment = { commentText, userId, postId };
    try {
      dispatch(createComment(newComment));
      setCommentText('');
      handleClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        style={{ color: `${!open ? '	#a9a9a9' : '#00c98c'}` }}
      >
        <Typography
          variant="body2"
          style={{
            color: `${!open ? '	#a9a9a9' : '#00c98c'}`,
          }}
        >
          Comment ({postComments.length})
        </Typography>
      </Button>
      {open && (
        <>
          <Stack component="form" onSubmit={create} style={{ marginTop: '10' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Comment here..."
              name="commentText"
              value={commentText}
              onChange={onChange}
            />
            <Button
              onClick={create}
              variant="contained"
              style={{ marginTop: '5' }}
            >
              Comment
            </Button>
          </Stack>
          {postComments.length ? (
            <Typography variant="body2" mt={2} mb={1}>
              All comments:
            </Typography>
          ) : (
            ''
          )}
          <Stack spacing={2}>
            {postComments.map((comment) => {
              return (
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
              );
            })}
          </Stack>
        </>
      )}
    </>
  );
};

export default CreateComment;
