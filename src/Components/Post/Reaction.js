import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button, Typography } from '@mui/material';
import { createReaction, deleteReaction, setReactions } from '../../store';
import { useEffect } from 'react';

const Reaction = (props) => {
  const dispatch = useDispatch();
  const { auth, reactions } = useSelector((state) => state);
  const userId = auth.id;
  const { postId } = props;

  const postReactions = reactions.filter(
    (reaction) => reaction.postId === postId
  );
  const likes = postReactions.filter((reaction) => reaction.name === 'like');

  const [like, setLike] = useState(true);

  const onClick = (e) => {
    e.preventDefault();
    const newReaction = { name: 'like', postId, userId };
    setLike((prev) => !prev);
    if (like) {
      dispatch(createReaction(newReaction));
    } else {
      dispatch(deleteReaction(reactions[reactions.length - 1]));
    }
  };

  return (
    <>
      <Button
        value="like"
        onClick={onClick}
        style={{
          color: `${like ? '	#a9a9a9' : '#00c98c'}`,
          marginRight: '1rem',
        }}
        startIcon={<ThumbUpIcon />}
      >
        <Typography
          variant="body2"
          style={{
            color: `${like ? '	#a9a9a9' : '#00c98c'}`,
          }}
        >{`like (${likes.length})`}</Typography>
      </Button>
    </>
  );
};

export default Reaction;
