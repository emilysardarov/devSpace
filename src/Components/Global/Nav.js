import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { logout } from '../../store';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Popover,
  Avatar,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Notifications from '../Notifications';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.075),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.125),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: '12vw',
    marginRight: '17vw',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'primary',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function PrimarySearchAppBar() {
  const { auth, notifications, messageNotifications } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const notifOpen = Boolean(notifAnchorEl);
  const notifId = open ? 'notif-popover' : undefined;

  /* desktop menu */
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      py={20}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/user/${auth.username}/profile`}
      >
        My Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/user/${auth.username}/follows`}
      >
        My Follows
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/${auth.username}`}
      >
        My devSpace
      </MenuItem>
      <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      py={20}
    >
      <MenuItem component={Link} to={`/${auth.username}/messenger`}>
        <IconButton size="large" aria-label="Messenger" color="primary">
          <Badge badgeContent={messageNotifications.length} color="secondary">
            <ChatIcon />
          </Badge>
        </IconButton>
        <p>Messenger</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="New notifications" color="primary">
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          {auth.profilePic ? (
            <Avatar
              alt="auth.username"
              src={auth.profilePic}
              style={{ width: '25', height: '25' }}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <p>{auth.username}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} mb={11}>
      <AppBar
        position="fixed"
        elevation={2}
        style={{ backgroundColor: '#fff' }}
      >
        <Toolbar>
          <Link to="/">
            <img
              src="../../static/img/devSpace_logo_landscape_x2.png"
              alt="devSpace"
              height="64"
            />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="info" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Posts…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  navigate(`/search/${ev.target.value}`);
                }
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="messenger"
              color="primary"
              component={Link}
              to={`/${auth.username}/messenger`}
            >
              <Badge
                badgeContent={messageNotifications.length}
                color="secondary"
              >
                <ChatIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="new notifications"
              onClick={handleNotifClick}
              color="primary"
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              id={notifId}
              open={notifOpen}
              anchorEl={notifAnchorEl}
              onClose={handleNotifClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Notifications />
            </Popover>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              {auth.profilePic ? (
                <Avatar
                  alt="auth.username"
                  src={auth.profilePic}
                  style={{ width: '25', height: '25' }}
                  sx={{ boxShadow: 1 }}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
