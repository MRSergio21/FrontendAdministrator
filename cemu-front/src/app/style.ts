import { theme } from '@/app/theme';

export const loginBackgroundStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  minwidth: '100vw',
  flexDirection: 'column',
  backgroundImage: "url('/svg/login_background.svg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#F5F5F5',
};

export const loginCardStyles = {
  display: 'flex',
  width: '810px',
  height: '210px',
  borderRadius: '30px',
  padding: '40px',
  boxShadow: 'none',
};

export const loginSelectStyles = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  padding: '0',
  minWidth: 'auto',
  fontFamily: 'Roboto',
  fontSize: '14px',
};

export const loginIconButtonStyles = {
  'backgroundColor': theme.palette.primary.main,
  'color': 'white',
  'borderRadius': '0 4px 4px 0',
  'height': '40px',
  'width': '40px',
  '&:hover': {
    backgroundColor: '#014374',
  },
  '&:disabled': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
};

export const loginLogoStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '300px',
};

export const loginTextFieldBox = {
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Roboto',
  borderRadius: '4px',
  overflow: 'hidden',
  width: '22.5rem',
};

export const ImageCemuStyles = { width: 50, display: 'block' };

export const CemuTypography = {
  fontSize: '20px',
  textAlign: 'center',
  marginTop: '4px',
  paddinLeft: '10px',
  fontFamily: 'Roboto',
};
