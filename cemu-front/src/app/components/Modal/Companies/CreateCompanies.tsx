'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { TextField, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useAlertStore } from '@/app/stores/alert.store';
import { useCompanyMutations } from '../../../hooks/useCompany';

export type CreateCompanyRef = {
  submit: () => Promise<{ success: boolean }>;
};

export interface CompanyCreationDTO {
  name: string;
}

const CreateCompany = forwardRef<CreateCompanyRef>(function CreateCompany(_, ref) {
  const { createCompany } = useCompanyMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<CompanyCreationDTO>({
    defaultValues: {
      name: '',
    },
  });

  useImperativeHandle(ref, () => ({
    async submit() {
      const values = getValues();
      if (!values.name) {
        setAlert('El nombre de la empresa es obligatorio.', 'error');
        return { success: false };
      }

      try {
        await createCompany.mutateAsync(values);
        setAlert('Empresa creado correctamente.', 'success');
        return { success: true };
      } catch (err: any) {
        setAlert(err.message || 'Error desconocido al crear la empresa.', 'error');
        return { success: false };
      }
    },
  }));

  return (
    <Box component='form' noValidate sx={{ mt: 1 }}>
      <TextField
        label='Nombre de la empresa'
        {...register('name', { required: 'El nombre es obligatorio.' })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
});

export default CreateCompany;
