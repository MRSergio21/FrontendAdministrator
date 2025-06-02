import { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Action, IRowActionsMenu } from '@/app/utils/types.utils';

const RowActionsMenu = ({ index, actions }: IRowActionsMenu) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderActionButton = (
    action: Action | null | undefined,
    key: string,
  ) => {
    if (!action) return null;

    return (
      <Tooltip title={action.name} key={key}>
        <IconButton
          onClick={() => action.onClick(index, handleClose)}
          disabled={action.disabled}
        >
          {action.icon}
        </IconButton>
      </Tooltip>
    );
  };

  const outsideActions = actions?.filter(action => action.outsideMenu);
  const insideActions = actions?.filter(action => !action.outsideMenu);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {outsideActions?.map(action => renderActionButton(action, action.id))}

      {insideActions && insideActions.length > 0 && (
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon fontSize='small' />
          </IconButton>
          <Menu
            id={`simple-menu-${index}`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {insideActions.map(action => (
              <MenuItem
                key={action.id}
                onClick={() => {
                  action.onClick(index, handleClose);
                  handleClose();
                }}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                disabled={action.disabled}
              >
                <div style={{ textAlign: 'center' }}>{action.icon}</div>
                <div style={{ textAlign: 'left' }}>{action.name}</div>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};

export default RowActionsMenu;
