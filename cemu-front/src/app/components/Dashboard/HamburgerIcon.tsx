'use client';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type HamburgerIconProps = {
  onMenuClick: () => void;
};

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onMenuClick }) => {
  return (
    <IconButton
      color='inherit'
      aria-label='menu'
      onClick={onMenuClick}
      sx={{ p: 0 }}
    >
      <MenuIcon fontSize='inherit' sx={{ fontSize: 24 }} />
    </IconButton>
  );
};

export default HamburgerIcon;
