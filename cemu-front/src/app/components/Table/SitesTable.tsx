'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@/public/svg/edit-pencil.svg';
import Image from 'next/image';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  CircularProgress,
  Stack,
  Button,
} from '@mui/material';
import Dialog from '@/app/components/Modal/GlobalModal';

import { useState } from 'react';
import { Creation } from '../Modal/Creation';

export type Project = {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  organizationIds: string[];
  totalProfiles: number;
};

type ProjectsTableProps = {
  total: number;
  projects: Project[];
  limit: number;
  currentOffset: number;
};

const tableContainerStyles = {
  maxWidth: '100%',
  height: '50vh',
  border: '1px solid #E0E0E0',
  borderBottom: 'none',
  borderRadius: '4px 4px 0px 0px',
  overflow: 'auto',
};

const tableCellStyles = {
  backgroundColor: '#fff',
  padding: '0px 8px',
  fontSize: '12px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '41px',
  fontwight: 400,
};
const tableIconCellStyles = {
  backgroundColor: '#fff',
  padding: '0px 8px',
  fontSize: '12px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '41px',
  textAlign: 'right',
  alignSelf: 'center',
};

const tableRowStyles = {
  'height': '32px',
  '&:last-child td': {},
};

const tableCellHeaderStyles = {
  ...tableCellStyles,
  padding: '8px',
  backgroundColor: '#EEEEEE',
};

const tablePaginationStyles = {
  backgroundColor: '#fff',
  border: '1px solid #E0E0E0',
  borderRadius: '0px 0px 4px 4px',
};

const SitesTable: React.FC<ProjectsTableProps> = ({
  projects,
  total,
  limit,
  currentOffset,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = (type: 'delete' | 'edit') => () =>
    setOpenDialogType(type);
  const handleCloseDialog = () => setOpenDialogType('');
  const [openDialogType, setOpenDialogType] = useState<'' | 'delete' | 'edit'>(
    '',
  );

  const currentPage = Math.floor(currentOffset / limit);

  const handlePageChange = (_event: unknown, newPage: number) => {
    const newOffset = newPage * limit;
    startTransition(() => {
      router.push(
        `/dashboard/sites?offset=${newOffset}&limit=${limit}&busqueda=${
          searchParams.get('busqueda') || ''
        }`,
      );
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    startTransition(() => {
      router.push(
        `/dashboard/sites?offset=0&limit=${newLimit}&busqueda=${
          searchParams.get('busqueda') || ''
        }`,
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '66vh',
        position: 'relative',
      }}
    >
      <TableContainer
        sx={[tableContainerStyles, { flexGrow: 1, minHeight: 0 }]}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={tableRowStyles}>
              <TableCell sx={tableCellHeaderStyles}>Nombre</TableCell>
              <TableCell sx={tableCellHeaderStyles}>Organización</TableCell>
              <TableCell sx={tableCellHeaderStyles}>Perfiles</TableCell>
              <TableCell sx={tableCellHeaderStyles}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id} hover sx={tableRowStyles}>
                <TableCell sx={tableCellStyles}>{project.name}</TableCell>
                <TableCell sx={tableCellStyles}>
                  {project.organizationIds?.length > 0
                    ? project.organizationIds.map(id => (
                        <Chip
                          key={id}
                          label={id}
                          size='small'
                          sx={{
                            width: '112px',
                            mr: 0.5,
                            fontSize: 13,
                            height: 22,
                          }}
                        />
                      ))
                    : '—'}
                </TableCell>
                <TableCell sx={tableCellStyles}>
                  {project.totalProfiles}
                </TableCell>
                <TableCell sx={tableIconCellStyles}>
                  <Stack
                    className=''
                    sx={{ flexDirection: 'row', justifyContent: 'end' }}
                  >
                    <Button style={{ padding: '6px 8px' }} color='inherit'>
                      <PermIdentityIcon />
                    </Button>

                    <Button
                      style={{ padding: '6px 8px' }}
                      onClick={handleOpenDialog('edit')}
                    >
                      <Image
                        src={EditIcon.src}
                        alt='Edit icon'
                        width={20}
                        height={20}
                        color={'grey'}
                      />
                    </Button>

                    <Button
                      style={{ padding: '6px 8px', color: 'black' }}
                      onClick={handleOpenDialog('delete')}
                    >
                      <MoreVertIcon />
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={tablePaginationStyles}>
        <TablePagination
          component='div'
          count={total}
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage='Filas por página:'
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          sx={{ p: 2 }}
        />
      </Box>
      {openDialogType === 'delete' && (
        <Dialog
          open
          onClose={handleCloseDialog}
          content='¿Está seguro de que desea eliminar este sitio? Esta acción es de carácter permanente y no se puede deshacer.'
          title='Eliminar Sitio'
          DialogConfirmation='Sí'
          DialogCancel='No'
        />
      )}

      {openDialogType === 'edit' && (
        <Dialog
          open
          onClose={handleCloseDialog}
          content={<Creation />}
          title='Editar Sitio'
          DialogConfirmation='Sí'
          DialogCancel='No'
        />
      )}

      {isPending && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SitesTable;
function setOpenDialogType(type: string) {
  throw new Error('Function not implemented.');
}
