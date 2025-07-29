'use client';

import React from 'react';
import { Icon } from '@mui/material';
import Image from 'next/image';

interface ImageIconProps {
  imageFile: string;
  isSelected?: boolean;
  size?: number;
  onClick?: () => void;
}

const ImageIcon: React.FC<ImageIconProps> = ({
  imageFile,
  isSelected,
  onClick,
  size = 20,
}) => {
  const iconImageStyles = {
    width: `${size}px`,
    height: `${size}px`,
    filter: isSelected
      ? 'invert(29%) sepia(93%) saturate(3326%) hue-rotate(190deg) brightness(65%) contrast(85%)'
      : 'none',
  };

  return (
    <Icon onClick={onClick} sx={{ fontSize: `${size}px` }}>
      <Image
        src={imageFile}
        alt='Custom Icon'
        width={size}
        height={size}
        style={iconImageStyles}
      />
    </Icon>
  );
};

export default ImageIcon;
