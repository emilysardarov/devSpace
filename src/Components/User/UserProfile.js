import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchUser, updateAuth } from '../../store';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  Avatar,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import avatarDefault from '../../../static/img/avatar-default.jpeg';
import Sidebar from '../Global/Sidebar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const { username } = useParams();
  const { auth } = useSelector((state) => state);
  const [el, setEl] = useState(null);
  const [data, setData] = useState(auth.profilePic);
  const theme = useTheme();
  const [languages, setlanguages] = React.useState(auth.topics);
  const [user, setUser] = useState({
    username: auth.username,
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
    githubUsername: auth.githubUsername,
    bio: auth.bio,
    topics: auth.topics,
    location: auth.location,
    profilePic: auth.profilePic,
  });

  const onChange = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  };

  useEffect(() => {
    dispatch(fetchUser(username));
  }, []);

  useEffect(() => {
    if (el) {
      el.addEventListener('change', (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          setData(reader.result);
        });
      });
    }
  }, [auth, el]);

  const save = async (ev) => {
    ev.preventDefault();
    const updatedAuth = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: data,
      githubUsername: user.githubUsername,
      bio: user.bio,
      topics: languages,
      location: user.location,
    };
    try {
      dispatch(updateAuth(updatedAuth));
      el.value = '';
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 5;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.75 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const languageList = [
    'Javascript',
    'CSS',
    'HTML',
    'React',
    'Postgres',
    'Sequelize',
    'Express',
    'Node',
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setlanguages(typeof value === 'string' ? value.split(',') : value);
  };
  function getStyles(name, languages, theme) {
    return {
      fontWeight:
        languages.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Sidebar url={'profile'} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper
          sx={{
            height: { xs: 'auto', sm: '91vh' },
            p: { xs: '20', sm: '0' },
          }}
          elevation={5}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
          }}
        >
          <Box component="main" onSubmit={save}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {/* First Column */}
              <Grid item xs={12} sm={6}>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <br /> <br /> <br />
                    <Avatar
                      src={data ? data : auth.profilePic || avatarDefault}
                      sx={{
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        marginLeft: '30%',
                        alignSelf: 'center',
                        resizeMode: 'center',
                        boxShadow: '3',
                        borderStyle: edit ? 'solid' : '',
                        borderColor: edit ? '#331f94' : '',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <input
                      type="file"
                      className="form-control"
                      center
                      accept="image/*"
                      id="select-image"
                      style={{ display: 'none' }}
                      ref={(x) => {
                        setEl(x);
                      }}
                    />
                    <label htmlFor="select-image">
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        sx={{ marginLeft: '35%' }}
                        disabled={edit ? '' : 'disabled'}
                      >
                        <AddPhotoAlternateIcon />
                        Upload Image
                      </Button>
                    </label>
                    <br /> <br />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Bio
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="bio"
                      variant="outlined"
                      fullWidth
                      value={user.bio}
                      multiline
                      rows={3}
                      onChange={onChange}
                      disabled={edit ? '' : 'disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Interests
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={9}>
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        name="topics"
                        variant="outlined"
                        multiple
                        value={languages}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        disabled={edit ? '' : 'disabled'}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {languageList.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, languages, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={1} />
                </Grid>
              </Grid>

              {/* Second Column  */}
              <Grid item xs={12} sm={6}>
                <Grid container>
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <br /> <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Username
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="username"
                      variant="outlined"
                      disabled={true}
                      fullWidth
                      value={user.username}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      First Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />

                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      value={user.firstName}
                      onChange={onChange}
                      disabled={edit ? '' : 'disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />

                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Last Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />

                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="lastName"
                      variant="outlined"
                      fullWidth
                      value={user.lastName}
                      onChange={onChange}
                      disabled={edit ? '' : 'disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />

                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} />

                  <Grid item xs={12} sm={1} />

                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="email"
                      variant="outlined"
                      fullWidth
                      value={user.email}
                      onChange={onChange}
                      disabled={edit ? '' : 'disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      GitHub ID
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="githubUsername"
                      variant="outlined"
                      fullWidth
                      value={user.githubUsername}
                      onChange={onChange}
                      disabled={edit ? '' : 'disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Location
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={1} />
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      name="location"
                      variant="outlined"
                      fullWidth
                      value={user.location}
                      onChange={onChange}
                      disabled={edit ? '' : 'disabled'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <br /> <br />
          <span>
            <Button
              variant="contained"
              sx={{ marginRight: '20px' }}
              onClick={() => setEdit(true)}
              disabled={edit ? 'disabled' : ''}
            >
              Edit
            </Button>
            <Button variant="contained" onClick={save} disabled={!edit}>
              Save
            </Button>
          </span>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
