'use client';
import { createTheme } from '@mui/material';
import { esES } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#01579B',
      },
    },
    typography: {
      fontSize: 14,
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            'whiteSpace': 'nowrap',
            'overflow': 'hidden',
            'textOverflow': 'ellipsis',
            'paddingRight': '48px',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            'whiteSpace': 'nowrap',
            'overflow': 'hidden',
            'textOverflow': 'ellipsis',
            'paddingRight': '48px',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiFormControl: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
          input: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
            '& input.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
    },
  },
  esES,
);
