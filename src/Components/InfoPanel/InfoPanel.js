import React from 'react';
import { TechNews } from './TechNews';
import { GithubRepos } from './GithubRepos';
import { HackerNews } from './HackerNews';
const InfoPanel = () => {
  return (
    <div>
      <HackerNews />
      <GithubRepos />
    </div>
  );
};

export default InfoPanel;
