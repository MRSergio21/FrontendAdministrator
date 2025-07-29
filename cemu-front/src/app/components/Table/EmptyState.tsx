import { Typography, Stack, TableRow, TableCell } from '@mui/material';

interface EmptyStateProps {
  title: string;
  colLength: number; // this should already include collapsible + actions if needed
  description?: string;
}

const EmptyState = ({ title, colLength, description }: EmptyStateProps) => {
  return (
    <TableRow>
      <TableCell
        colSpan={colLength}
        sx={{
          textAlign: 'center',
          height: '100px',
          borderBottom: 'none',
          p: 0,
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          height='100%'
          spacing={1}
        >
          <Typography sx={{ fontSize: '14px', color: '#424242' }}>
            {title}
          </Typography>
          {description && (
            <Typography sx={{ fontSize: '12px', color: '#757575' }}>
              {description}
            </Typography>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default EmptyState;
