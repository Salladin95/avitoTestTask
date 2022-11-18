import React from 'react';
import { Container, Button, Link as MuiLink, Typography, List, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { IComment, IStory } from '../../api/contracts';
import Comment from '../../components/comment';
import conver2Date from '../../utils/convertToDate';

type StoryPagePresentationProps = {
  story: IStory | null;
  comments: IComment[] | null;
  onRefreshBtnClick: () => void;
};

const StoryPagePresentation = ({
  story,
  comments,
  onRefreshBtnClick,
}: StoryPagePresentationProps) => {
  return (
    <Container>
      <Button variant="outlined" sx={{ width: '250px', mr: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Return to main page
        </Link>
      </Button>
      <Button onClick={onRefreshBtnClick} sx={{ width: '100px', my: '1rem' }} variant="outlined">
        Refresh
      </Button>
      <Typography component="h1" variant="h4" sx={{ my: '1rem' }}>
        Title: {story?.title}
      </Typography>
      <Typography component="p" variant="h5" sx={{ mb: '1rem' }}>
        <MuiLink sx={{ textDecoration: 'none', color: 'inherit' }}>Link: {story?.url}</MuiLink>
      </Typography>
      <Typography component="p" variant="h5" sx={{ my: '1rem' }}>
        Date: {story?.time && conver2Date(story.time)}
      </Typography>
      <Typography component="p" variant="h5" sx={{ my: '1rem' }}>
        By: {story?.by}
      </Typography>
      <Typography component="p" variant="h5" sx={{ my: '1rem' }}>
        Amount of comments: {story?.descendants}
      </Typography>
      <List sx={{ mt: '2rem' }} component="nav">
        <Typography component="p" variant="h4">
          Comments
        </Typography>
      </List>
      <Grid sx={{ display: 'flex', flexDirection: 'column', mb: '1.3rem' }}>
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Grid>
    </Container>
  );
};

export default StoryPagePresentation;
