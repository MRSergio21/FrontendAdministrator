'use client';
import React from 'react';
import { Icon } from '@mui/material';

interface ImageIconProps {
  imageFile: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const ImageIcon: React.FC<ImageIconProps> = ({
  imageFile,
  isSelected,
  onClick,
}) => {
  const iconImageStyles = {
    width: '24px',
    height: '24px',
    filter: isSelected
      ? 'invert(29%) sepia(93%) saturate(3326%) hue-rotate(190deg) brightness(65%) contrast(85%)'
      : 'none',
  };

  return (
    <Icon onClick={onClick}>
      <img src={imageFile} alt='Custom Icon' style={iconImageStyles} />
    </Icon>
  );
};

export default ImageIcon;
