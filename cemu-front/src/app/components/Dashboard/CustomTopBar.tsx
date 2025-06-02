import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import HamburgerIcon from './HamburgerIcon';
import ProfileIcon from './ProfileIcon';
import NotificationIcon from './NotificationIcon';

type CustomTopBarProps = {
  username: string;
  onMenuClick: () => void;
  onTopBarClick: () => void;
};

const CustomTopBar: React.FC<CustomTopBarProps> = ({
  username,
  onMenuClick,
  onTopBarClick,
}) => {
  return (
    <AppBar position='fixed' sx={{ bgcolor: '#01579b' }}>
      <Toolbar sx={{ gap: '16px' }}>
        <HamburgerIcon onMenuClick={onMenuClick} />

        <Typography variant='h6' sx={{ flexGrow: 1, cursor: 'pointer' }}>
          <Link href='/dashboard/sites' passHref onClick={onTopBarClick}>
            CEMU Uneatlantico
          </Link>
        </Typography>

        <NotificationIcon />
        <ProfileIcon />
      </Toolbar>
    </AppBar>
  );
};

export default CustomTopBar;
