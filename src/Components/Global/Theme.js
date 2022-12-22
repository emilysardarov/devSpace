import { createTheme } from '@mui/material/styles';
const Theme = createTheme({
  palette: {
    primary: {
      main: '#331f94', //purple
      light: '#f3c82e', //yellow
      dark: '#00c98c', //green
    },
    /* #c2acff */ //light purple

    secondary: {
      main: '#00c98c', //green
      light: '#ff9500', //orange
      dark: '#f3c82e', //yellow

      contrastText: '#fff',
    },
    info: {
      main: '#b3b3b3',
    },
  },

  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontWeight: 900,
      fontSize: '2.25rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      color: '#000000d9',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '0.875rem',
      color: '#fff',
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '0.75rem',
      color: '#000000d9',
    },
  },
});

export default Theme;
