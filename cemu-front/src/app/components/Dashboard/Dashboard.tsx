'use client';
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  ListItemButton,
  Typography,
} from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomTopBar from './CustomTopBar';
import ArticlePerson from '../../../../public/svg/article_person1.svg';
import ImageIcon from './ImageIcon';
import { School, Assessment, ContactPage, AccountBalance } from '@mui/icons-material';

const drawerWidth = 240;
const collapsedWidth = 95;

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

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();
  const [selectedPath, setSelectedPath] = useState<string>(pathname);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleItemClick = (path: string) => {
    setSelectedPath(path);
  };
  const handleTopBarClick = () => {
    setSelectedPath('/dashboard/sites');
  };

  return (
    <Box sx={{ display: 'flex', Height: '100vh', bgcolor: '#EEE' }}>
      <CustomTopBar
        username={'Usuario'}
        onMenuClick={handleDrawerToggle}
        onTopBarClick={handleTopBarClick}
      />

      <Drawer
        variant='permanent'
        sx={{
          'width': sidebarOpen ? drawerWidth : collapsedWidth,
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxShadow: 'none',
            zIndex: 1,
            marginTop: '56px',
          },
        }}
      >
        <List>
          {navItems.map(item => (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              onClick={() => handleItemClick(item.path)}
              selected={selectedPath.includes(item.path)}
              sx={{
                justifyContent: 'center',
                alignContent: 'center',
                pl: sidebarOpen ? '35px' : '20px',
                paddingY: '20px',
                backgroundColor: selectedPath.includes(item.path)
                  ? '#E8F0FE'
                  : 'inherit',
                color: selectedPath.includes(item.path) ? '#01579B' : 'inherit',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : 0,
                  color: selectedPath.includes(item.path)
                    ? '#01579B'
                    : 'inherit',
                }}
              >
                {item.label === 'Perfiles' ? (
                  <ImageIcon
                    imageFile={"../"}
                    isSelected={selectedPath.includes(item.path)}
                  />
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component='main'
        sx={{
          height: '100vh',
          flexGrow: 1,
          p: '30px',
          pt: 6,
          ml: sidebarOpen ? drawerWidth : collapsedWidth,
          minHeight: 'calc(100vh - 32px)',
          backgroundColor: '#F5F5F5',
          marginLeft: 0,
          paddingBottom: '28px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
