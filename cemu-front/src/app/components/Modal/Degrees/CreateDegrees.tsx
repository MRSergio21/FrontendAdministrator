'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { TextField, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useAlertStore } from '@/app/stores/alert.store';
import { useDegreeMutations } from '../../../hooks/useDegrees';

export type CreateDegreeRef = {
  submit: () => Promise<{ success: boolean }>;
};

export interface DegreeCreationDTO {
  name: string;
}

const CreateDegree = forwardRef<CreateDegreeRef>(function CreateDegree(_, ref) {
  const { createDegree } = useDegreeMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<DegreeCreationDTO>({
    defaultValues: {
      name: '',
    },
  });

  useImperativeHandle(ref, () => ({
    async submit() {
      const values = getValues();
      if (!values.name) {
        setAlert('El nombre del grado es obligatorio.', 'error');
        return { success: false };
      }

      try {
        await createDegree.mutateAsync(values);
        setAlert('Grado creado correctamente.', 'success');
        return { success: true };
      } catch (err: any) {
        setAlert(err.message || 'Error desconocido al crear el grado.', 'error');
        return { success: false };
      }
    },
  }));

  return (
    <Box component='form' noValidate sx={{ mt: 1 }}>
      <TextField
        label='Nombre del Grado'
        {...register('name', { required: 'El nombre es obligatorio.' })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
});

export default CreateDegree;
