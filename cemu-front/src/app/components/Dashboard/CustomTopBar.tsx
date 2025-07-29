import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import HamburgerIcon from './HamburgerIcon';
import ProfileIcon from './ProfileIcon';

type CustomTopBarProps = {
  onMenuClick: () => void;
  onTopBarClick: () => void;
};

const CustomTopBar: React.FC<CustomTopBarProps> = ({
  onMenuClick,
  onTopBarClick,
}) => {
  return (
    <AppBar position='fixed' sx={{ bgcolor: '#01579b' }}>
      <Toolbar disableGutters sx={{ gap: '16px', ml: 2, mr: 3 }}>
        <HamburgerIcon onMenuClick={onMenuClick} />

        <Typography
          variant='h6'
          sx={{ flexGrow: 1, cursor: 'pointer', fontSize: '18px' }}
        >
          <Link href='/dashboard/interneship' passHref onClick={onTopBarClick}>
            CEMU Uneatlantico
          </Link>
        </Typography>

        <ProfileIcon />
      </Toolbar>
    </AppBar>
  );
};

export default CustomTopBar;
