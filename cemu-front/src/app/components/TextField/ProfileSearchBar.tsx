import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <TextField
      variant='outlined'
      placeholder='Buscar'
      size='small'
      sx={{
        'width': '300px', // ancho personalizado
        '& .MuiOutlinedInput-root': {
          'borderRadius': '10px', // bordes redondeados
          '& fieldset': {
            borderColor: '#757575', // color del borde
          },
          '&:hover fieldset': {
            borderColor: '#999', // color al hacer hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2', // color al enfocar (azul MUI)
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon fontSize='small' />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
