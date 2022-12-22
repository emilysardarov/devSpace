import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';
import {
  MenuItem,
  Paper,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = ({ url }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  return (
    <Paper sx={{ height: { xs: 'auto', sm: '88vh' }, p: 2 }} elevation={5}>
      <MenuItem
        selected={url.endsWith('profile')}
        component={Link}
        to={`/user/${auth.username}/profile`}
        style={{ height: '3rem' }}
      >
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText>My Profile</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        selected={url.endsWith('follows')}
        component={Link}
        to={`/user/${auth.username}/follows`}
        style={{ height: '3rem' }}
      >
        <ListItemIcon>
          <PeopleIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText>My Follows</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        component={Link}
        to={`/${auth.username}`}
        style={{ height: '3rem' }}
      >
        <ListItemIcon>
          <CodeIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText>My devSpace</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => dispatch(logout())} style={{ height: '3rem' }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </Paper>
  );
};

export default Sidebar;
