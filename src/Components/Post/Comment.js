import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { IconButton, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment, setComments } from '../../store';
import EditComment from './EditComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserBadge from '../User/UserBadge';
import { UpdateSharp } from '@mui/icons-material';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Comment = (props) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const {
    commentId,
    username,
    userId,
    comment,
    createdAt,
    updatedAt,
    profilePic,
  } = props;

  const [showForm, setShowForm] = useState(false);
  const date = new Date(createdAt);
  const date2 = new Date(updatedAt);
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
    dispatch(deleteComment(commentId));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card variant="outlined" mt={1} style={{ backgroundColor: ' #fdfdfd' }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <strong>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item margin={'.5rem'}>
                    <UserBadge
                      username={username}
                      updatedAt={updatedAt}
                      profilePic={profilePic}
                    />
                  </Grid>
                </Grid>
              </strong>
            </Grid>
            {auth.id === userId && (
              <>
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
                {showForm && (
                  <EditComment
                    key={commentId}
                    onClose={() => {
                      setShowForm(false);
                      handleClose();
                    }}
                    commentId={commentId}
                    userId={userId}
                    username={username}
                    comment={comment}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                  />
                )}
              </>
            )}
          </Grid>
          <Typography variant="body1" mt={1}>
            {comment}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Comment;
