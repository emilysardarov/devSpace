import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../../store';
import { ErrorMessage } from '../lib';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const dispatch = useDispatch();
  const [customError, setCustomError] = useState('');
  const [validationError, setValidationError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState({
    username: '',
    password: '',
    cpassword: '',
  });

  const onChange = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  };

  const create = async (ev) => {
    ev.preventDefault();
    const credentials = { username: user.username, password: user.password };
    if (user.password != user.cpassword) {
      setCustomError('Passwords do not match');
    } else {
      try {
        await axios.post('/api/users', user);
        setUser({
          username: '',
          password: '',
        });
        dispatch(attemptLogin(credentials, setCustomError));
      } catch (ex) {
        setValidationError(ex.response.data);
        /*  console.log(ex.response.data); */
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={create}
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
          id="outlined-usename"
          label="Username"
          placeholder="Username"
          value={user.username}
          name="username"
          onChange={onChange}
        />
        <TextField
          required
          id="outlined-password"
          label="Password"
          placeholder="Password"
          name="password"
          value={user.password}
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
        <TextField
          required
          id="outlined-cpassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="cpassword"
          value={user.cpassword}
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
        onClick={create}
        style={{ width: '90%', marginTop: '20', marginBottom: '1rem' }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
