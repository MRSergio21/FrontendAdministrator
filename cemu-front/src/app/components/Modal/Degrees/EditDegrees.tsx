'use client';

import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useAlertStore } from '@/app/stores/alert.store';
import { useDegreeMutations, useDegreeQuery } from '@/app/hooks/useDegrees';
import type { DegreesCreationDTO } from '@/app/models/degrees.model';

export type EditDegreeRef = {
  submit: () => Promise<{ success: boolean }>;
};

type Props = {
  id: string;
};

const EditDegree = forwardRef<EditDegreeRef, Props>(function EditDegree(
  { id },
  ref
) {
  const { updateDegree } = useDegreeMutations();
  const { data: degree, isLoading } = useDegreeQuery(id);
  const setAlert = useAlertStore(state => state.setAlert);

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<DegreesCreationDTO>({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (degree) {
      setValue('name', degree.name);
    }
  }, [degree, setValue]);

  useImperativeHandle(ref, () => ({
    async submit() {
      const values = getValues();
      if (!values.name) {
        setAlert('El nombre es obligatorio.', 'error');
        return { success: false };
      }

      try {
        await updateDegree.mutateAsync({ id, data: values });
        setAlert('Grado actualizado correctamente.', 'success');
        return { success: true };
      } catch (err: any) {
        setAlert(err.message || 'Error al actualizar el grado.', 'error');
        return { success: false };
      }
    },
  }));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component='form' noValidate sx={{ mt: 1 }}>
      <Controller
        name='name'
        control={control}
        rules={{ required: 'El nombre es obligatorio.' }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Nombre del Grado'
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
      />
    </Box>
  );
});

export default EditDegree;
