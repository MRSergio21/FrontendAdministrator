'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const CustomSearchBar = ({
  query,
  setQuery,
  label,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}) => {
  const [shrink, setShrink] = useState(false);
  const [iconOpacity, setIconOpacity] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('busqueda') || '';
    setQuery(searchQuery);
  }, [setQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const url = new URL(window.location.href);
    url.searchParams.set('busqueda', newQuery);
    window.history.pushState({}, '', url.toString());
  };

  const handleFocus = () => {
    setShrink(true);
    setIconOpacity(1);
  };

  const handleBlur = () => {
    setShrink(!!query);

    if (!query) {
      setIconOpacity(0);
      setTimeout(() => {
        setIconOpacity(1);
      }, 150);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2,
      }}
    >
      <TextField
        label={label}
        variant='outlined'
        size='small'
        value={query}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{
                'marginRight': '8px',
                'transition': 'opacity 0.1s ease-in-out',
                'opacity': iconOpacity,
                '& .MuiSvgIcon-root': {
                  color: query || shrink ? '#01579B' : '#757575',
                },
              }}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink,
        }}
        sx={{
          '& .MuiInputLabel-root': {
            marginLeft: '30px',
            transition: 'margin-left 0.3s ease',
          },
          '& .Mui-focused .MuiInputLabel-root, & .MuiInputLabel-shrink': {
            marginLeft: '0px',
          },
        }}
      />
    </Box>
  );
};
