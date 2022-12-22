import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Link } from '@mui/material';
import Sidebar from './Sidebar';
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container align="center" maxWidth="sm" sx={{ my: 3 }}>
      <img alt="" src="../../static/img/404.svg" width="300" />
      <Typography variant="h2" mb={3}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h6" m={3}>
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </Typography>
      <Link
        variant="h6"
        underline="hover"
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </Link>
    </Container>
  );
};

export default PageNotFound;
