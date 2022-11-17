import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

type BackdropProps = { open: boolean };

const BackdropComponent = ({ open }: BackdropProps) => {
  return (
    <div>
      <Backdrop
        data-testid="backdrop"
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default BackdropComponent;
