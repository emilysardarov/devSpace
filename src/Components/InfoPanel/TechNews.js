import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const TechNews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: {
      count: '5',
      category: 'Technology',
      mkt: 'en-US',
      safeSearch: 'Off',
      textFormat: 'Raw',
    },
    headers: {
      'Accept-Language': 'en-US',
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    },
  };
  const fetchData = async () => {
    await axios
      .request(options)
      .then(function (response) {
        setData(response.data.value);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const count = 3;
  if (!loading) {
    return (
      <div>
        <h2>Tech News</h2>
        <section className="list">
          {data.slice(0, count).map((item, index) => {
            return (
              <article className="item" key={index}>
                <a href={item.url} target="_blank">
                  {item.name || 'hello'}
                </a>
                <p>{item.description || 'world'}</p>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};
