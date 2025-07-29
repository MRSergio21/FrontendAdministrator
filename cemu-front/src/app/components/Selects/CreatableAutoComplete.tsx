'use client';

import React, { useState } from 'react';
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Controller } from 'react-hook-form';
import { DeleteOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

export type CreatableOption = {
  id?: string;
  name: string;
  inputValue?: string;
  isNew?: boolean;
};

interface CreatableAutocompleteProps {
  name: string;
  control: any;
  label: string;
  options: CreatableOption[];
  isLoading?: boolean;
  onCreate: (name: string) => Promise<CreatableOption>;
  onDelete?: (id: string, name?: string) => Promise<void> | void;
  rules?: any;
}

export default function CreatableAutocomplete({
  name,
  control,
  label,
  options,
  isLoading = false,
  onCreate,
  onDelete,
  rules,
}: CreatableAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        // Determine the Autocomplete value: either the matching option object, or the raw id string, or empty string
        const acValue: CreatableOption | string =
          options.find(opt => opt.id === field.value) ?? field.value ?? '';

        return (
          <Autocomplete<CreatableOption, false, true, true>
            freeSolo
            disableClearable
            loading={isLoading}
            options={options}
            value={acValue}
            onInputChange={(_, value) => setInputValue(value)}
            onChange={async (_e, newValue) => {
              // Cleared
              if (newValue === '') {
                field.onChange('');
                return;
              }

              // Existing option selected
              if (typeof newValue !== 'string' && newValue.id) {
                field.onChange(newValue.id);
                return;
              }

              // New option creation
              const nameToCreate =
                typeof newValue === 'string'
                  ? newValue
                  : (newValue.inputValue ?? inputValue);
              const trimmed = nameToCreate.trim();
              if (!trimmed) return;

              setCreating(true);
              try {
                const created = await onCreate(trimmed);
                field.onChange(created.id);
              } catch (err) {
                console.error('Error creating option:', err);
              } finally {
                setCreating(false);
              }
            }}
            getOptionLabel={option =>
              typeof option === 'string'
                ? option
                : (option.inputValue ?? option.name)
            }
            filterOptions={(opts, params) => {
              const filtered = opts.filter(opt =>
                opt.name
                  .toLowerCase()
                  .includes(params.inputValue.toLowerCase()),
              );
              const exists = opts.some(
                o => o.name.toLowerCase() === params.inputValue.toLowerCase(),
              );
              if (params.inputValue && !exists) {
                filtered.push({
                  inputValue: params.inputValue,
                  name: `Añadir "${params.inputValue}"`,
                  isNew: true,
                });
              }
              return filtered;
            }}
            sx={{ mb: 2 }}
            popupIcon={<ArrowDropDownIcon />}
            forcePopupIcon
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                  {option.name}
                  {onDelete && option.id && !option.isNew && (
                    <Tooltip title='Borrar organización'>
                      <IconButton
                        edge='end'
                        size='small'
                        onClick={async e => {
                          e.stopPropagation();
                          setDeletingId(option.id!);
                          try {
                            await onDelete(option.id!, option.name);
                            // if the deleted option was selected, clear the field
                            if (field.value === option.id) {
                              field.onChange('');
                              setInputValue('');
                            }
                          } catch (err) {
                            console.error('Delete error:', err);
                          } finally {
                            setDeletingId(null);
                          }
                        }}
                        sx={{ ml: 'auto' }}
                        disabled={deletingId === option.id}
                      >
                        {deletingId === option.id ? (
                          <CircularProgress size={16} />
                        ) : (
                          <DeleteOutlined sx={{ color: 'grey' }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </li>
              );
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {(creating || isLoading) && (
                        <CircularProgress color='inherit' size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
