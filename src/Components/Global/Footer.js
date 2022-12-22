import React from 'react';
import { Typography, Grid, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: '#fff', minHeight: '10vh', paddingTop: '25' }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" mb={2} style={{ textAlign: 'center' }}>
          © Fullstack Academy 2022 Capstone Project
        </Typography>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Link
              href="https://github.com/xyshtd"
              variant="subtitle2"
              color="#00000099"
              target="_blank"
            >
              Nono Hu
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://github.com/bsalting"
              variant="subtitle2"
              color="#00000099"
              target="_blank"
            >
              Beejay Salting
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://github.com/felixlee-catcodes"
              variant="subtitle2"
              color="#00000099"
              target="_blank"
            >
              C.Felix Lee
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://github.com/emilysardarov"
              variant="subtitle2"
              color="#00000099"
              target="_blank"
            >
              Emily Sardarov
            </Link>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
