import React, { useEffect } from 'react';
import { Container, Button, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectStory } from '../news/newsSlice';
import conver2Date from '../../utils/convertToDate';
import thunkedGetComments from './thunkedGetComments';
import { selectComments } from './commentsSlice';

const StoryPage = () => {
  const story = useAppSelector(selectStory);
  const dispath = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    story?.kids && dispath(thunkedGetComments(story.kids));
  }, [dispath, story?.kids]);

  console.log(story, 'story');
  console.log(comments, 'commnets');
  return (
    <Container>
      <Button variant="outlined" sx={{ width: '250px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Return to main page
        </Link>
      </Button>
      <Typography component="h1" variant="h4" sx={{ my: '1rem' }}>
        Title: {story?.title}
      </Typography>
      <Typography component="p" variant="h5" sx={{ mb: '1rem' }}>
        <MuiLink sx={{ textDecoration: 'none', color: 'inherit' }}>Link: {story?.url}</MuiLink>
      </Typography>
      <Typography component="h1" variant="h5" sx={{ my: '1rem' }}>
        Data: {story?.time && conver2Date(story.time)}
      </Typography>
      <Typography component="h1" variant="h5" sx={{ my: '1rem' }}>
        By: {story?.by}
      </Typography>
      <Typography component="h1" variant="h5" sx={{ my: '1rem' }}>
        Amount of comments: {story?.descendants}
      </Typography>
    </Container>
  );
};

export default StoryPage;
