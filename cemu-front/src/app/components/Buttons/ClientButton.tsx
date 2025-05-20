'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const ClientButton = ({
  label,
  variant,
  modal,
}: {
  label: string;
  variant: string;
  modal: React.ReactElement<any>;
}) => {
  const [open, setOpen] = useState(false);

  const modalWithProps = React.cloneElement(modal, {
    open: open,
    onClose: () => setOpen(false),
  });

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={variant as 'text' | 'outlined' | 'contained'}
        sx={theme => ({
          'backgroundColor': 'none',
          'color': theme.palette.primary.main,
          '&:hover': { color: 'grey' },
          'boxShadow': 'none',
          'gap': '0.3rem',
        })}
      >
        <AddIcon />
        {label}
      </Button>
      {modalWithProps}
    </>
  );
};
