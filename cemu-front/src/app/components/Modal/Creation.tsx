'use client';

import React from 'react';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from 'react-hook-form';
import projects from '@/app/(pages)/(private)/dashboard/sites/projects';

type FormData = {
  name: string;
  url: string;
  organization: string;
};

export function Creation() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      url: '',
      organization: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '478px' }}>
        <Stack sx={{ width: '100%', gap: '0.875rem' }}>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Nombre requerido' }}
            render={({ field }: { field: any }) => (
              <TextField {...field} placeholder='Nombre' fullWidth />
            )}
          />

          <Controller
            name='url'
            control={control}
            rules={{ required: 'URL requerida' }}
            render={({ field }: { field: any }) => (
              <TextField {...field} placeholder='URL' fullWidth />
            )}
          />

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Controller
              name='organization'
              control={control}
              render={({ field }: { field: any }) => (
                <Autocomplete
                  options={projects().sites.map(
                    (project: { name: string }) => project.name,
                  )}
                  value={field.value || null}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={params => (
                    <TextField {...params} placeholder='Organización' />
                  )}
                  sx={{ flex: 1 }}
                  freeSolo
                />
              )}
            />
            <Button type='submit'>
              <AddIcon sx={{ color: 'grey' }} />
            </Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}
