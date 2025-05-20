'use client';

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationIcon: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);

  const handleNotificationsClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationAnchorEl(null);
  };
  return (
    <>
      <IconButton color='inherit' onClick={handleNotificationsClick}>
        <NotificationsIcon />
      </IconButton>

      <Menu
        anchorEl={notificationAnchorEl}
        open={notificationOpen}
        onClose={handleNotificationsClose}
      >
        <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationIcon;
