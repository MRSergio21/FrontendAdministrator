'use client';

import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type CustomSearchBarProps = {
  value: string;
  onSearch: (q: string) => void;
};

export const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onSearch,
}) => {
  const [query, setQuery] = useState(value);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    onSearch(q);
  };

  return (
    <TextField
      placeholder='Buscar'
      variant='outlined'
      size='small'
      value={query}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      sx={{
        width: 250,
      }}
      InputLabelProps={{ shrink: focused || Boolean(query) }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon
              sx={{
                color: focused || query ? 'primary.main' : 'text.disabled',
                transition: 'color 0.2s',
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
