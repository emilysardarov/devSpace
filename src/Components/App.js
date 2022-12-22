import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';

import AuthenticatedApp from './AuthenticatedApp';
import UnAuthenticatedApp from './UnAuthenticatedApp';
import Theme from './Global/Theme';

import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      {auth.id ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </ThemeProvider>
  );
};

export default App;
