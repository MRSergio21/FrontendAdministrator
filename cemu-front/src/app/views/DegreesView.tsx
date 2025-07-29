'use client';

import { useMemo, useState } from 'react';
import { useQueryState } from 'nuqs';
import {
  Box,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CustomSearchBar } from '../components/TextField/CumstomSearchBar';
import { DataTable } from '../components/Table/DataTable';

import type { Column } from '@/app/utils/types.utils';
import type { DegreesResponseDTO } from '../models/degrees.model';
import { useDegreeMutations, useDegreesQuery } from '@/app/hooks/useDegrees';
import { useAlertStore } from '@/app/stores/alert.store';

export default function DegreesView() {
  const { data: allDegrees = [], isLoading } = useDegreesQuery();

  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [page, setPage] = useQueryState('page', {
    defaultValue: 0,
    parse: Number,
    serialize: String,
  });
  const [rowsPerPage, setRowsPerPage] = useQueryState('limit', {
    parse: Number,
    serialize: String,
    defaultValue: 5,
  });

  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: 'name',
  });

  const [orderDir, setOrderDir] = useQueryState<'asc' | 'desc'>('orderDir', {
    defaultValue: 'asc',
    parse: v => (v === 'desc' ? 'desc' : 'asc'),
    serialize: String,
  });

  const [selectedDegree, setSelectedDegree] = useState<DegreesResponseDTO | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newDegreeName, setNewDegreeName] = useState('');
  const [editingDegreeId, setEditingDegreeId] = useState<string | null>(null);

  const { deleteDegree, createDegree, updateDegree } = useDegreeMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  const filtered = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() ?? '';
    if (!q) return allDegrees;
    return allDegrees.filter(degree =>
      degree.name.toLowerCase().includes(q),
    );
  }, [allDegrees, searchQuery]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return orderDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return orderDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortBy, orderDir]);

  const paginated = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage],
  );

  const columns: Column[] = [
    { id: 'name', label: 'Nombre del Grado' },
    { id: 'actions', label: 'Acciones', align: 'right' },
  ];

  const handleDelete = async () => {
    if (!selectedDegree) return;
    try {
      await deleteDegree.mutateAsync({ id: String(selectedDegree.id) });
      setAlert('Grado eliminado correctamente.', 'success');
    } catch (err: any) {
      setAlert('Error al eliminar el grado.', 'error');
    } finally {
      setSelectedDegree(null);
      setOpenConfirm(false);
    }
  };

  const handleSaveDegree = async () => {
    if (!newDegreeName.trim()) {
      setAlert('El nombre del grado es obligatorio.', 'warning');
      return;
    }
    try {
      if (editingDegreeId) {
        await updateDegree.mutateAsync({ id: editingDegreeId, data: { name: newDegreeName.trim() } });
        setAlert('Grado actualizado correctamente.', 'success');
      } else {
        await createDegree.mutateAsync({ name: newDegreeName.trim() });
        setAlert('Grado creado correctamente.', 'success');
      }
      setNewDegreeName('');
      setEditingDegreeId(null);
      setOpenAddModal(false);
    } catch (err: any) {
      setAlert('Error al guardar el grado.', 'error');
    }
  };

  const tableData = paginated.map(degree => ({
    id: degree.id,
    name: degree.name,
    actions: (
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <IconButton
          onClick={() => {
            setEditingDegreeId(degree.id);
            setNewDegreeName(degree.name);
            setOpenAddModal(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedDegree(degree);
            setOpenConfirm(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
  }));

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" p={3} pb={1}>
        <CustomSearchBar value={searchQuery ?? ''} onSearch={setSearchQuery} />
        <Button
          variant="text"
          sx={{ color: '#01579B', textTransform: 'none' }}
          onClick={() => {
            setEditingDegreeId(null);
            setNewDegreeName('');
            setOpenAddModal(true);
          }}
        >
          + AÑADIR
        </Button>
      </Stack>

      <Box p={3}>
        <DataTable
          tableName="Grados Académicos"
          columns={columns}
          data={tableData}
          totalCount={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          handleChangePage={(_, newPage) => setPage(newPage)}
          handleChangeRowsPerPage={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sortBy={sortBy ?? undefined}
          orderDirection={orderDir}
          handleChangeSort={colId => {
            if (sortBy === colId) {
              setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
            } else {
              setSortBy(colId);
              setOrderDir('asc');
            }
            setPage(0);
          }}
          actions={() => []}
          isLoading={isLoading}
          height="60vh"
          collapsible={false}
          SkeletonRow={() => (
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id}>
                  <Skeleton />
                </TableCell>
              ))}
            </TableRow>
          )}
        />
      </Box>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
      >
        <DialogTitle>¿Eliminar grado?</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar el grado{' '}
          <strong>{selectedDegree?.name}</strong>? Esta acción no se puede
          deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
      >
        <DialogTitle>{editingDegreeId ? 'Editar grado' : 'Añadir grado'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del grado"
            type="text"
            fullWidth
            variant="outlined"
            value={newDegreeName}
            onChange={e => setNewDegreeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancelar</Button>
          <Button onClick={handleSaveDegree} variant="contained" color="primary">
            {editingDegreeId ? 'Actualizar' : 'Añadir'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
