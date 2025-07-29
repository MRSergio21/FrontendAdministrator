'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import ImageIcon from './ImageIcon';
import { AccountBalance, Assessment, ContactPage, School } from '@mui/icons-material';

const drawerWidth = 256;
const collapsedWidth = 72;

const navItems = [
  {
    label: 'Prácticas Profesionales',
    path: '/dashboard/internesips/',
    icon: <ContactPage />, 
  },
  {
    label: 'Empresas',
    path: '/dashboard/companies/',
    icon: <AccountBalance />, 
  },
  {
    label: 'Grados',
    path: '/dashboard/degrees/',
    icon: <School />, 
  },
  {
    label: 'Estadísticas',
    path: '/dashboard/statistics',
    icon: <Assessment />,
  },
];

interface DashboardDrawerProps {
  open: boolean;
  onSelect: (path: string) => void;
  selectedPath: string;
}

const DashboardDrawer: React.FC<DashboardDrawerProps> = ({
  open,
  onSelect,
  selectedPath,
}) => {
  const theme = useTheme();

  return (
    <Drawer
      variant='permanent'
      sx={{
        'width': open ? drawerWidth : collapsedWidth,
        'flexShrink': 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxShadow: 'none',
          borderRight: 'none',
          zIndex: 1,
          marginTop: '64px',
          color: '#424242',
        },
      }}
    >
      <List>
        {navItems.map(item => (
          <ListItemButton
            key={item.path}
            component={Link}
            href={item.path}
            onClick={() => onSelect(item.path)}
            selected={selectedPath.includes(item.path)}
            sx={{
              'justifyContent': 'center',
              'alignContent': 'center',
              'pl': open ? '12px' : '16px',
              paddingLeft: open ? '26px' : '30x',
              'paddingY': '9.5px',
              'backgroundColor': selectedPath.includes(item.path)
                ? '#E8F0FE'
                : 'inherit',
              'color': selectedPath.includes(item.path) ? '#01579B' : 'inherit',
              '& .MuiListItemText-root': {
                '& .MuiTypography-root': {
                  fontSize: '0.875rem',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                'minWidth': 0,
                'mr': open ? '20px' : 0,
                'color': selectedPath.includes(item.path)
                  ? '#01579B'
                  : 'inherit',
                '& .MuiSvgIcon-root': {
                  fontSize: '1.25rem', // Tamaño de icono más pequeño
                },
              }}
            >
              {typeof item.icon === 'string' ? (
                <ImageIcon
                  imageFile={item.icon}
                  isSelected={selectedPath.includes(item.path)}
                />
              ) : (
                item.icon
              )}
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: selectedPath.includes(item.path) ? '600' : '400',
                  fontSize: '0.875rem',
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default DashboardDrawer;
