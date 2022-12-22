import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import styled from '@emotion/styled';

export const ErrorMessage = ({ validationError = {}, customError = '' }) => {
  let messages = [];
  if (Object.keys(validationError).length) {
    messages = validationError.errors.map((e) => e.message);
  }

  messages.push(customError);
  if (messages.length) {
    return (
      <List dense>
        {messages.map((message) => {
          return (
            <ListItem key={message}>
              <Typography variant="body2" color="error">
                {message}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    );
  }
};

export const TextContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
