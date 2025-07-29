'use client';

import { Snackbar, Alert } from '@mui/material';
import { useAlertStore } from '@/app/stores/alert.store';
import Slide from '@mui/material/Slide';

export function GlobalAlert() {
  const { message, show, severity, clearAlert } = useAlertStore();

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={clearAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      slots={{ transition: Slide }}
    >
      <Alert onClose={clearAlert} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
