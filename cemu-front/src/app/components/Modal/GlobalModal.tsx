import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { JSX } from 'react/jsx-runtime';

export default function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
  DialogConfirmation,
  DialogCancel,
  SecondTitle,
  SecondaryContent,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  content: JSX.Element | string;
  DialogConfirmation: string;
  DialogCancel: string;
  SecondTitle?: string;
  SecondaryContent?: JSX.Element;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent sx={{ padding: '16px 24px' }}>{content}</DialogContent>
      <DialogTitle sx={{ paddingTop: '0', paddingBottom: '0' }}>
        {SecondTitle}
      </DialogTitle>
      <DialogContent sx={{ padding: '0px 24px', fontSize: '18px' }}>
        {' '}
        {SecondaryContent}
      </DialogContent>
      <DialogActions
        sx={{
          paddingTop: '16px',
          paddingBottom: '24px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <Button
          sx={{ color: 'black' }}
          onClick={() => {
            onConfirm?.();
            onClose();
          }}
        >
          {DialogCancel}
        </Button>

        <Button onClick={onClose} autoFocus>
          {DialogConfirmation}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
