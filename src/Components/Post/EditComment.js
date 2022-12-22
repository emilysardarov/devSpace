import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from '@mui/material';
import { editComment } from '../../store';

const EditComment = (props) => {
  const dispatch = useDispatch();
  const { auth, comments } = useSelector((state) => state);
  const {
    onClose,
    commentId,
    userId,
    username,
    comment,
    createdAt,
    updatedAt,
  } = props;
  const [commentText, setCommentText] = useState(comment);
  const postId = props.postId;

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const update = async (e) => {
    e.preventDefault();
    const updatedComment = {
      commentId,
      commentText,
      userId,
      postId,
      updatedAt,
    };
    try {
      dispatch(editComment(updatedComment));
      onClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogContent>
        <Box component="form" onSubmit={update}>
          <Stack>
            <Typography variant="h4">Edit your comment</Typography>
            <TextField
              fullwidth
              multiline
              maxRows={4}
              name=""
              value={commentText}
              onChange={onChange}
              style={{
                padding: '2rem 0 1rem 0',
              }}
            />
            <Button onClick={update} variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditComment;
