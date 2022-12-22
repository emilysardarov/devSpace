import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TextContainer } from '../lib';
import { Typography, Link, Skeleton, Box, Stack, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
export const GithubRepos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    method: 'GET',
    url: 'https://github-trending.p.rapidapi.com/repositories',
    params: {
      language: 'javascript',
      since: 'weekly',
      spoken_language_code: 'en',
    },
    headers: {
      'X-RapidAPI-Key': '8c442a04bdmshcab54c0cd4bfcecp1b0f4bjsn21927f63588e',
      'X-RapidAPI-Host': 'github-trending.p.rapidapi.com',
    },
  };

  const fetchData = async () => {
    await axios
      .request(options)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const count = 4;

  //add loading spin

  return (
    <div>
      <Typography variant="h4" my={2}>
        Trending Repos <GitHubIcon />
      </Typography>
      {loading ? (
        <Box sx={{ height: 360 }}>
          <Skeleton animation="wave" variant="text" height={90} />
          <Skeleton animation="wave" variant="text" height={90} />
          <Skeleton animation="wave" variant="text" height={90} />
          <Skeleton animation="wave" variant="text" height={90} />
        </Box>
      ) : (
        <Box>
          {data.slice(0, count).map((item, index) => {
            return (
              <Stack key={index}>
                <Link
                  href={item.url}
                  target="_blank"
                  variant="h6"
                  underline="hover"
                  color="secondary.light"
                >
                  {item.name}
                </Link>
                <TextContainer>
                  <Typography variant="body2" mt={0.5}>
                    {item.description}
                  </Typography>
                </TextContainer>
                <Divider
                  style={{ width: '100%', marginTop: '6', marginBottom: '12' }}
                />
              </Stack>
            );
          })}
        </Box>
      )}
    </div>
  );
};
