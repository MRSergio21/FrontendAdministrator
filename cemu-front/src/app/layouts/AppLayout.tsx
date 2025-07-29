'use client';

import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import CustomTopBar from '../components/Dashboard/CustomTopBar';
import DashboardDrawer from '../components/Dashboard/Dashboard';
import { usePathname } from 'next/navigation';

type AppLayoutProps = {
  topContent: React.ReactNode;
  lateralContent?: React.ReactNode;
  lateralWidth?: number;
  children: React.ReactNode;
};

const drawerWidth = 240;
const collapsedWidth = 72;
const topBarHeight = 64; // Adjust based on your AppBar height

const AppLayout: React.FC<AppLayoutProps> = ({
  topContent,
  lateralContent,
  children,
  lateralWidth = 200,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <>
      <CustomTopBar
        username="User"
        onMenuClick={handleDrawerToggle}
        onTopBarClick={handleTopBarClick}
      />

      <DashboardDrawer
        open={sidebarOpen}
        onSelect={handleItemClick}
        selectedPath={selectedPath}
      />

      <Box
        component='main'
        sx={{
          position: 'fixed',
          top: `${topBarHeight}px`,
          left: sidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
          right: 0,
          bottom: 0,
          backgroundColor: '#F5F5F5',
          transition: 'left 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top Content (static space below AppBar) */}
        <Box sx={{ px: 3, pt: 3, flexShrink: 0 }}>{topContent}</Box>

        {/* Main scrollable content area */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            width: '100%',
            overflow: 'hidden',
            px: 3,
            pb: 3,
            minHeight: 0,
          }}
        >
          {lateralContent && (
            <Box
              sx={{
                width: lateralWidth,
                flexShrink: 0,
                pr: 3,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100%',
              }}
            >
              {lateralContent}
            </Box>
          )}

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              minHeight: 0,
              backgroundColor: '#fff',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              p: 1,
            }}
          >
            {/* Only children scroll vertically */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                minHeight: 0,
              }}
            >
              {children}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
