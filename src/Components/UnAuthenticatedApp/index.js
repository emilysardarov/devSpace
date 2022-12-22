import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Footer from '../Global/Footer';
import { Container, Grid, Typography, Button, Paper } from '@mui/material';

const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div
      style={{
        backgroundImage: 'url(../../static/img/home_background.svg',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <Container
        maxWidth="md"
        style={{
          height: '90vh',
          marginTop: '3vh',
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid item xs={12} sm={6}>
            <img
              src="../../static/img/devSpace_logo_landscape_x2.png"
              alt="devSpace"
              width="250"
            />
            <Typography variant="h6" mt={2}>
              The Space Where Developers Connect and Share
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              style={{
                padding: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '3vh',
              }}
            >
              <Typography variant="h5">Welcome to devSpace</Typography>
              {isRegister ? <Register /> : <Login />}
              <Button onClick={() => setIsRegister(!isRegister)}>
                {isRegister
                  ? 'Have an account? Sign in'
                  : "Don't have an account? Register"}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default UnAuthenticatedApp;
