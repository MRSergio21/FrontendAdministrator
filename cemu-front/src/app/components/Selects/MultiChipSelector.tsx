'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Check, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

type Option<T extends string> = {
  label: string;
  value: T;
};

export type ChipGroupConfig<T extends string> = {
  label: string;
  selected: T[];
  options: Option<T>[];
  onAdd: (v: T) => void;
  onRemove: (v: T) => void;
  loading?: boolean;
};

type MultiChipSelectorProps = {
  groups: ChipGroupConfig<any>[];
  onClear: () => void;
};

export function MultiChipSelector({ groups, onClear }: MultiChipSelectorProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const anchors = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {groups.map((group, idx) => (
        // Wrap each group in its own flex container
        <Box
          key={group.label}
          sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {/* 1) Render this group’s selected chips immediately */}
          {group.selected.map(value => {
            const option = group.options.find(opt => opt.value === value);
            return (
              <Chip
                key={`${group.label}-${value}`}
                label={option?.label || value}
                onDelete={() => group.onRemove(value)}
                icon={<Check fontSize='small' sx={{ fontWeight: 'bold' }} />}
                sx={{ backgroundColor: '#E8F0FE' }}
              />
            );
          })}

          {/* 2) Then render the dropdown chip for this group */}
          <div
            ref={el => {
              anchors.current[idx] = el;
            }}
          >
            <Chip
              label={group.label}
              onClick={() => setOpenMenuIndex(idx)}
              deleteIcon={
                openMenuIndex === idx ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )
              }
              onDelete={() => setOpenMenuIndex(idx)}
            />
            <Menu
              anchorEl={anchors.current[idx]}
              open={openMenuIndex === idx}
              onClose={() => setOpenMenuIndex(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {group.loading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography variant='body2'>Cargando...</Typography>
                </MenuItem>
              ) : group.options.length > 0 ? (
                group.options.map(opt => {
                  const already = group.selected.includes(opt.value);
                  return (
                    <MenuItem
                      key={opt.value}
                      disabled={already}
                      onClick={() => {
                        if (already) return;
                        group.onAdd(opt.value);
                        setOpenMenuIndex(null);
                      }}
                    >
                      {opt.label}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>
                  <Typography variant='body2' color='text.secondary'>
                    Sin opciones
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </div>
        </Box>
      ))}

      <Button
        disabled={groups.every(group => group.selected.length === 0)}
        onClick={onClear}
        sx={{ color: '#424242', fontWeight: 'semibold', fontSize: '14px' }}
      >
        Limpiar
      </Button>
    </Box>
  );
}
