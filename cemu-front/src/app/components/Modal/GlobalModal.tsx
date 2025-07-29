'use client';

import React, { useRef, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
  Modal,
  LinearProgress,
  Fade,
  Backdrop,
} from '@mui/material';
import useFormType from '../../hooks/useFormType';
import useGlobalModalStore from '../../stores/modal.store';

type FormRefType = { submit: () => Promise<{ success: boolean }> };

export default function GlobalModal() {
  const formRef = useRef<FormRefType>(null);
  const { open, title, formType, data, closeModal } = useGlobalModalStore();
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    if (!formRef.current) return;
    setPending(true);

    try {
      const { success } = await formRef.current.submit();
      if (success) {
        closeModal();
      }
    } catch (err) {
      console.error('Error ejecutando el formulario:', err);
    } finally {
      setPending(false);
    }
  };

  const content = useFormType(formType, data, formRef);

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') closeModal();
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: 'relative',
            width: 480,
            bgcolor: '#FFF',
            borderRadius: '8px',
            py: 1.5,
            px: 1,
            outline: 'none',
          }}
        >
          <DialogTitle>{title}</DialogTitle>

          <DialogContent sx={{ px: 3, pt: 0, pb: 2 }}>{content}</DialogContent>

          <DialogActions sx={{ px: 3, pt: 1, pb: 1 }}>
            <Stack direction='row' justifyContent='flex-end' spacing={2}>
              <Button color='inherit' onClick={closeModal} disabled={pending}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm} disabled={pending}>
                Confirmar
              </Button>
            </Stack>
          </DialogActions>

          {pending && (
            <LinearProgress
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                borderRadius: '0 0 8px 8px',
              }}
            />
          )}
        </Box>
      </Fade>
    </Modal>
  );
}