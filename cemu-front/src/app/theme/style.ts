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
  backgroundColor: '#F7F9FC',
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
  fontSize: '14px',
};

export const loginIconButtonStyles = {
  'backgroundColor': '#01579B',
  'color': 'white',
  'borderRadius': '0 8px 8px 0',
  'height': '40px',
  'width': '40px',
  'transition': 'background-color 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    backgroundColor: '#014374',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  },
  '&:disabled': {
    'backgroundColor': '#A0A0A0',
    'color': '#E0E0E0',
    'cursor': 'not-allowed',
    '&:hover': {
      backgroundColor: '#A0A0A0',
      boxShadow: 'none',
    },
  },
  '&:focus-visible': {
    outline: '2px solid #0288D1',
    outlineOffset: '2px',
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
  borderRadius: '4px',
  overflow: 'hidden',
  width: '22.5rem',
};
