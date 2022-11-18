import React from 'react';
import { Container, Grid, List, ListItem, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { IStory } from '../../api/contracts';
import conver2Date from '../../utils/convertToDate';

type NewsPresentationProps = {
  news: IStory[] | null;
  onStoryClick: (id: number) => void;
};

const NewsPresentation = ({ news, onStoryClick }: NewsPresentationProps) => {
  return (
    <List disablePadding>
      {news?.map((item) => (
        <Grid key={item.id} sx={{ display: 'flex', flexDirection: 'column', mb: '1.3rem' }}>
          <ListItem disablePadding>
            <ListItemText>
              <Link
                onClick={() => onStoryClick(item.id)}
                to={`item/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Title: {item.title}
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding sx={{ bgcolor: grey[300] }}>
            <ListItemText sx={{ maxWidth: '80px', mr: '5px' }}>rating: {item.score}</ListItemText>
            <ListItemText sx={{ maxWidth: '180px', mr: '5px' }}>author: {item.by}</ListItemText>
            <ListItemText
              sx={{
                maxWidth: '225px',
              }}
            >
              date: {conver2Date(item.time)}
            </ListItemText>
          </ListItem>
        </Grid>
      ))}
    </List>
  );
};

export default NewsPresentation;
