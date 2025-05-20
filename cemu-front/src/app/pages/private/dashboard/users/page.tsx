'use client';
import React, { SetStateAction, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CustomSearchBar } from '@/app/components/TextField/CustomSearchBar';
import { ClientButton } from '@/app/components/Buttons/ClientButton';

const Users = () => {
  function setQuery(value: SetStateAction<string>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Box sx={{ mt: 7, minHeight: '85vh' }}>
        <Typography
          sx={{
            mb: 2,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 600,
            fontSize: '22px',
          }}
        >
          {' '}
          Usuarios
        </Typography>
        <Box
          sx={{
            bgcolor: '#FFF',
            width: '100%',
            height: '95%',
            borderRadius: '4px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px',
                pb: '10px',
              }}
            >
              <Box sx={{}}></Box>
              <Box>
                <ClientButton
                  label={'Crear'}
                  variant={'text'}
                  modal={<Box />}
                />
              </Box>
            </Box>
            <Box sx={{ p: '24px' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
              odit. Doloremque animi, dicta, maxime fugit, impedit laborum vitae
              architecto nisi accusantium consectetur pariatur totam saepe
              aliquid reprehenderit unde voluptate? Laborum! Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Molestias, laboriosam. Non
              asperiores, assumenda molestias iste ullam dolor autem! Delectus
              ut veniam magni provident reprehenderit nam animi, nihil facilis
              aut ea!Loremloejshdjfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhj Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Reprehenderit est
              voluptates beatae saepe quod! Tempora, voluptate? Accusantium
              consectetur delectus rem a. Necessitatibus aperiam exercitationem
              porro, consectetur repellendus ipsam corporis debitis. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Totam debitis
              sapiente magni illo. Voluptatem, soluta sit cupiditate inventore
              illum obcaecati iure impedit, aut voluptatum dolores quas
              accusantium dignissimos veritatis dicta? Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Quibusdam, facere, soluta
              quasi excepturi tempora sapiente facilis sint id quas deserunt
              nostrum vel quisquam impedit vitae itaque reiciendis mollitia ut
              ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae saepe debitis mollitia, temporibus necessitatibus,
              deserunt ullam dicta, quisquam maiores dolorem rerum? Quas culpa
              temporibus porro veritatis, officia error saepe esse! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Vero sequi rerum qui
              quam consequuntur eum ratione animi debitis hic adipisci ea itaque
              distinctio eaque eos iure sed architecto, dolores neque!
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Users;
