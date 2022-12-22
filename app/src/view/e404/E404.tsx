import React from 'react';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const E404 = ({
  errorMsg = 'Page not found',
  link = '/',
}: {
  errorMsg?: string;
  link?: string;
}) => {
  return (
    <Container
      sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Alert severity="error" sx={{ fontSize: '1.3rem' }}>
        <AlertTitle>Error</AlertTitle>
        {errorMsg}
      </Alert>
      <Button variant="outlined" sx={{ width: '250px' }}>
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
          Return to main page
        </Link>
      </Button>
    </Container>
  );
};
export default E404;
