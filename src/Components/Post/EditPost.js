import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  Box,
  Tab,
  Button,
  TextField,
  DialogContent,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CodeSnippet from './CodeSnippet';
import { updatePost } from '../../store';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const EditPost = (props) => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state);

  const [input, setInput] = useState(null);
  const [text, setText] = useState(props.text || '');
  const [code, setCode] = useState(props.code || '');
  const [mediaUrl, setMediaUrl] = useState(props.mediaUrl);
  const [value, setValue] = React.useState('1');

  const id = props.id;
  const post = { id, text, code, mediaUrl };

  useEffect(() => {
    if (input) {
      input.addEventListener('change', (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          setMediaUrl(reader.result);
        });
      });
    }
  }, [input]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const submit = async (ev) => {
    ev.preventDefault();

    const post = { id, text, code, mediaUrl };

    try {
      await dispatch(updatePost(post));
      props.onClose();
    } catch (ex) {}
  };

  return (
    <Dialog open={true} onClose={props.onClose} fullWidth>
      <DialogContent onSubmit={submit}>
        <Box sx={{ width: '100%' }} component="form" variant="h4">
          <Typography variant="h4">Edit your post</Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} fullWidth>
              <TabList
                onChange={handleChange}
                // style={{ marginLeft: '20' }}
                aria-label="lab API tabs example"
              >
                <Tab label="Text/Image" value="1" />
                <Tab label="Code Snippet" value="2" />
              </TabList>
            </Box>
            <div
              style={{ width: '108%', marginLeft: '-20', marginRight: '-20' }}
            >
              <TabPanel value="1">
                <TextField
                  fullWidth
                  name=""
                  id=""
                  onChange={(ev) => setText(ev.target.value)}
                  value={text}
                  rows={3}
                  multiline
                />
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  id="select-image"
                  style={{ display: 'none' }}
                  ref={(el) => {
                    setInput(el);
                  }}
                />{' '}
                <label htmlFor="select-image">
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    sx={{ marginTop: 1 }}
                  >
                    <AddPhotoAlternateIcon /> Add an Image
                  </Button>
                </label>
              </TabPanel>
              <TabPanel value="2">
                <TextField
                  fullWidth
                  name=""
                  id=""
                  onChange={(ev) => setText(ev.target.value)}
                  value={text}
                  sx={{ marginBottom: '.5rem' }}
                />
                <CodeSnippet value={code} onChange={setCode} />
              </TabPanel>
              <TabPanel value="3">
                <input type="file" ref={(el) => setInput(el)} />
              </TabPanel>
            </div>
          </TabContext>
          <img style={{ maxHeight: 150, maxWidth: 200 }} src={mediaUrl} />
          <Button onClick={submit} variant="contained">
            Submit Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
