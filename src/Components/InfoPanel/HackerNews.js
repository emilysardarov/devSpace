import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextContainer } from '../lib';
import { Typography, Link, Skeleton, Box, Stack, Divider } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export const HackerNews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://hn.algolia.com/api/v1/search_by_date?query=tech?tags=story'
      );
      setData(response.data.hits);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const count = 4;

  return (
    <div>
      <Typography variant="h4" mb={2}>
        Hacker News <NewspaperIcon />
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
          {data
            .filter(
              (item) =>
                item._highlightResult?.story_title?.value &&
                item._highlightResult?.story_url?.value
            )
            .slice(0, count)
            .map((item, index) => {
              return (
                <Stack key={index}>
                  <TextContainer>
                    <Typography variant="body1">
                      {item._highlightResult.story_title.value}
                    </Typography>
                  </TextContainer>
                  <TextContainer>
                    <Link
                      href={item._highlightResult.story_url.value.replace(
                        /<\/?[^>]+(>|$)/g,
                        ''
                      )}
                      target="_blank"
                      variant="body2"
                      underline="hover"
                      color="secondary.light"
                      style={{ textAlign: 'right' }}
                    >
                      Read More
                    </Link>
                  </TextContainer>
                  <Divider
                    style={{
                      width: '100%',
                      marginTop: '6',
                      marginBottom: '12',
                    }}
                  />
                </Stack>
              );
            })}
        </Box>
      )}
    </div>
  );
};
