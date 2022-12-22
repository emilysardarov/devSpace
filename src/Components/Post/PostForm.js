import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store';
import CodeSnippet from './CodeSnippet';

export default function LabTabs() {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [input, setInput] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [code, setCode] = useState('');
  const [value, setValue] = React.useState('1');
  const { auth } = useSelector((state) => state);
  const userId = auth.id;

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
    const post = { userId, text, code, mediaUrl };
    try {
      await dispatch(createPost(post));
      setText('');
      setMediaUrl('');
      setCode('');
      setValue('1');
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Paper style={{ marginBottom: '50' }}>
      <Box
        sx={{ width: '100%', typography: 'body1' }}
        component="form"
        onSubmit={submit}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              style={{ marginLeft: '20' }}
            >
              <Tab label="Text/Image" value="1" />
              <Tab label="Code Snippet" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TextField
              fullWidth
              name=""
              id=""
              onChange={(ev) => setText(ev.target.value)}
              value={text}
              rows={3}
              multiline
              placeholder={`What's on your mind, ${auth.username}?`}
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
            />
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
              rows={3}
              multiline
              placeholder={`What's on your mind, ${auth.username}?`}
              sx={{ marginBottom: '.5rem' }}
            />
            <CodeSnippet value={code} onChange={setCode} />
          </TabPanel>
        </TabContext>
        {mediaUrl && (
          <img
            style={{
              maxHeight: 150,
              maxWidth: 'auto',
              alignSelf: 'center',
              marginBottom: '20',
            }}
            src={mediaUrl}
          />
        )}
        <Button
          onClick={submit}
          variant="contained"
          style={{ margin: ' 0 24 20 24' }}
        >
          POST
        </Button>
      </Box>
    </Paper>
  );
}
