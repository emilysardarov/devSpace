import React, { useState } from 'react';
import { attemptLogin } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ErrorMessage } from '../lib';
import GitHubIcon from '@mui/icons-material/GitHub';

const Login = () => {
  const dispatch = useDispatch();
  const [customError, setCustomError] = useState('');
  const [validationError, setValidationError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const { auth } = useSelector((state) => state);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials, setCustomError));
  };

  return (
    <Box
      component="form"
      onSubmit={login}
      sx={{
        '& .MuiTextField-root': { my: 1, width: '100%' },
        alignItems: 'center',
      }}
    >
      <ErrorMessage
        validationError={validationError}
        customError={customError}
      />
      <div>
        <TextField
          required
          id="outlined-required-username"
          label="Username"
          placeholder="Username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <TextField
          required
          id="outlined-required-password"
          label="Password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={login}
        style={{ width: '90%', marginTop: '20', marginBottom: '1rem' }}
      >
        Log in
      </Button>
      <Divider m={5} style={{ width: '90%', marginBottom: '12' }}>
        or
      </Divider>
      <Button
        variant="contained"
        color="secondary"
        href={`https://github.com/login/oauth/authorize?client_id=${window.GITHUB_CLIENT_ID}`}
        style={{
          width: '90%',
          marginBottom: '8',
          backgroundColor: '#333',
        }}
      >
        <GitHubIcon
          style={{
            marginRight: '8',
          }}
        />
        Log in with GitHub
      </Button>
    </Box>
  );
};

export default Login;
