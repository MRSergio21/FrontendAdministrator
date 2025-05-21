'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CEMULogo from '../../../../../public/svg/login_header.svg';
import {
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Container,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  CemuTypography,
  loginBackgroundStyles,
  loginIconButtonStyles,
  loginSelectStyles,
} from '@/app/style';

const languages = [
  { code: 'es', label: 'Español (España)' },
  { code: 'en', label: 'English' },
];

export default function GoLogin() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('es');
  const [showPassword] = useState(false);

  const handleNext = () => {
    if (step === 1 && username) {
      setStep(2);
    }
  };

  function handleLogin(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Stack sx={loginBackgroundStyles}>
      <Stack>
        <Card
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '40rem',
              lg: '50.625rem',
            },
            height: {
              xs: '100%',
              sm: '100%',
              md: '15rem',
              lg: '13.125rem',
            },
            borderRadius: '1.875rem',
            padding: '2.5rem',
            boxShadow: 'none',
          }}
        >
          <Stack
            sx={{
              flexDirection: {
                xs: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
              },
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: {
                xs: '0',
                sm: '0',
                md: '20px',
                lg: '0',
              },
            }}
          >
            <Stack>
              <Stack
                sx={{
                  flexDirection: 'column',
                  alignItems: {
                    xs: 'center',
                    sm: 'center',
                    md: 'start',
                    lg: 'start',
                  },
                  p: 3,
                  mb: 3,
                }}
              >
                <Image src={CEMULogo} alt='CEMU Logo' />

                <Typography sx={CemuTypography}>Cemu Uneatlantico</Typography>
              </Stack>
            </Stack>

            <Stack>
              <CardContent>
                <Stack
                  sx={{
                    alignItems: {
                      xs: 'center',
                      sm: 'start',
                      md: 'start',
                      lg: 'start',
                    },
                  }}
                >
                  <Typography
                    fontWeight={400}
                    fontFamily='Roboto'
                    fontSize={'24px'}
                  >
                    {step === 1 ? 'Iniciar sesión' : 'Ingrese su contraseña'}
                  </Typography>
                  <Typography
                    variant='body2'
                    fontFamily='Roboto'
                    color='textSecondary'
                    marginBottom={2}
                    fontSize={'12px'}
                  >
                    {step === 1
                      ? 'Introduzca su usuario para continuar'
                      : 'Introduzca su contraseña para continuar'}
                  </Typography>

                  <Stack
                    sx={{
                      flexDirection: 'row',
                      width: {
                        xs: '100%',
                        sm: '100%',
                        md: '22.375rem',
                        lg: '22.375rem',
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder={step === 1 ? 'Usuario' : 'Contraseña'}
                      type={
                        step === 1 ? 'text' : showPassword ? 'text' : 'password'
                      }
                      value={step === 1 ? username : password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        step === 1
                          ? setUsername(e.target.value)
                          : setPassword(e.target.value)
                      }
                      variant='outlined'
                      size='small'
                      sx={{
                        'flex': 1,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px 0 0 4px',
                          width: '100%',
                        },
                      }}
                    />
                    <IconButton
                      sx={loginIconButtonStyles}
                      disabled={step === 1 ? !username : !password}
                      onClick={step === 1 ? handleNext : handleLogin}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Stack>
          </Stack>
        </Card>

        <Stack
          sx={{
            mt: 3,
            alignSelf: {
              xs: 'center',
              sm: 'start',
              md: 'start',
              lg: 'start',
            },
            ml: { xs: '0', sm: 0, md: 0, lg: 0 },
          }}
        >
          <Select
            value={language}
            onChange={(e: SelectChangeEvent<string>) =>
              setLanguage(e.target.value)
            }
            variant='standard'
            disableUnderline
            sx={loginSelectStyles}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: '10px',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                },
              },
            }}
          >
            {languages.map(lang => (
              <MenuItem
                key={lang.code}
                value={lang.code}
                sx={{
                  'fontFamily': 'Roboto',
                  'fontSize': '16px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
    </Stack>
  );
}
