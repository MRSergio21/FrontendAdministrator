'use client';

import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useAlertStore } from '@/app/stores/alert.store';
import { useCompanyMutations, useCompanyQuery } from '../../../hooks/useCompany';
import type { CompaniesCreationDTO } from '../../../models/companies.models';

export type EditCompanyRef = {
  submit: () => Promise<{ success: boolean }>;
};

type Props = {
  id: string;
};

const EditCompany = forwardRef<EditCompanyRef, Props>(function EditCompany(
  { id },
  ref
) {
  const { updateCompany } = useCompanyMutations();
  const { data: company, isLoading } = useCompanyQuery(id);
  const setAlert = useAlertStore(state => state.setAlert);

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CompaniesCreationDTO>({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (company) {
      setValue('name', company.name);
    }
  }, [company, setValue]);

  useImperativeHandle(ref, () => ({
    async submit() {
      const values = getValues();
      if (!values.name) {
        setAlert('Todos los campos son obligatorios.', 'error');
        return { success: false };
      }

      try {
        await updateCompany.mutateAsync({ id, data: values });
        setAlert('Empresa actualizada correctamente.', 'success');
        return { success: true };
      } catch (err: any) {
        setAlert(err.message || 'Error al actualizar la empresa.', 'error');
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
            label='Nombre de la Empresa'
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

export default EditCompany;
