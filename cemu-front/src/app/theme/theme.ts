'use client';
import { createTheme } from '@mui/material';
import { esES as coreEsES } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#01579B',
      },
      secondary: {
        light: '#9E9E9E',
        main: '#EEEEE',
      },
    },
    typography: {
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: 14,
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            'whiteSpace': 'nowrap',
            'overflow': 'hidden',
            'textOverflow': 'ellipsis',
            'fontFamily': 'var(--font-inter), sans-serif',
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
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: '50%',
            width: 40,
            height: 40,
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '20px',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'var(--font-inter), sans-serif',
          },
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
      MuiChip: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: '12px',
            fontWeight: 400,
            padding: '8px',
            fontSize: '14px',
          },
          colorSuccess: {
            'backgroundColor': '#E8F5E9',
            'color': '#388E3C',
            '&:hover': {
              backgroundColor: '#C8E6C9',
            },
          },
          colorWarning: {
            'backgroundColor': '#FFF3E0',
            'color': '#F57F17',
            '&:hover': {
              backgroundColor: '#FFE082',
            },
          },
          colorDefault: {
            'backgroundColor': '#EEE',
            'color': '#424242',
            '&:hover': {
              backgroundColor: '#DDD',
            },
          },
        },
      },
      MuiTablePagination: {
        defaultProps: {
          slotProps: {
            select: {
              // these props go straight onto the internal Select
              sx: {
                'border': '1px solid',
                'borderColor': '#9E9E9E',
                'color': '#9E9E9E',
                'borderRadius': '8px',
                'px': 1,
                'pt': 0.5,

                // center the value text
                'textAlign': 'center',
                'textAlignLast': 'center',

                // center the inner element, leave room for icon
                '& .MuiSelect-select': {
                  display: 'flex',
                  justifyContent: 'center',
                  paddingRight: '32px',
                },

                // nudge the arrow icon
                '& .MuiSelect-icon': {
                  right: '8px',
                },
              },
              MenuProps: {
                PaperProps: {
                  sx: {
                    // center each menu item
                    '& .MuiMenuItem-root': {
                      justifyContent: 'center',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  coreEsES,
);
