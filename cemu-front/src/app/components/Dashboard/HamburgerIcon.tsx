'use client';
import React, { useState } from 'react';
import Hamburger from 'hamburger-react';

type HamburgerIconProps = {
  onMenuClick: () => void;
};

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onMenuClick();
  };

  return (
    <Hamburger
      size={24}
      toggled={isOpen}
      toggle={handleClick}
      direction='left'
      color='white'
      label='Show menu'
      duration={0.5}
      easing='ease'
    />
  );
};

export default HamburgerIcon;
