import React from 'react';
import Post from './Post';
import { Stack } from '@mui/material';

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <Stack key={post.id} mb={3} mx={0}>
            <Post
              userId={post.user.id}
              key={post.id}
              text={post.text}
              username={post.user.username}
              profilePic={post.user.profilePic}
              mediaUrl={post.mediaUrl}
              code={post.code}
              post={post.id}
              updatedAt={post.updatedAt}
            />
          </Stack>
        );
      })}
    </>
  );
};

export default Posts;
