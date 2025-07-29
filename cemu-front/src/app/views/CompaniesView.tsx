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
import type { CompaniesResponseDTO } from '../models/companies.models';
import { useCompaniesQuery, useCompanyMutations } from '../hooks/useCompany';
import { useAlertStore } from '@/app/stores/alert.store';

export default function CompaniesView() {
  const { data: allCompanies = [], isLoading } = useCompaniesQuery();

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

  const [selectedCompany, setSelectedCompany] = useState<CompaniesResponseDTO | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);

  const { deleteCompany, createCompany, updateCompany } = useCompanyMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  const filtered = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() ?? '';
    if (!q) return allCompanies;
    return allCompanies.filter(company =>
      company.name.toLowerCase().includes(q),
    );
  }, [allCompanies, searchQuery]);

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
    { id: 'name', label: 'Nombre de la Empresa' },
    { id: 'actions', label: 'Acciones', align: 'right' },
  ];

  const handleDelete = async () => {
    if (!selectedCompany) return;
    try {
      await deleteCompany.mutateAsync({ id: String(selectedCompany.id) });
      setAlert('Empresa eliminada correctamente.', 'success');
    } catch (err: any) {
      setAlert('Error al eliminar la empresa.', 'error');
    } finally {
      setSelectedCompany(null);
      setOpenConfirm(false);
    }
  };

  const handleSaveCompany = async () => {
    if (!newCompanyName.trim()) {
      setAlert('El nombre de la empresa es obligatorio.', 'warning');
      return;
    }
    try {
      if (editingCompanyId) {
        await updateCompany.mutateAsync({ id: editingCompanyId, data: { name: newCompanyName.trim() } });
        setAlert('Empresa actualizada correctamente.', 'success');
      } else {
        await createCompany.mutateAsync({ name: newCompanyName.trim() });
        setAlert('Empresa creada correctamente.', 'success');
      }
      setNewCompanyName('');
      setEditingCompanyId(null);
      setOpenAddModal(false);
    } catch (err: any) {
      setAlert('Error al guardar la empresa.', 'error');
    }
  };

  const tableData = paginated.map(company => ({
    id: company.id,
    name: company.name,
    actions: (
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <IconButton
          onClick={() => {
            setEditingCompanyId(company.id);
            setNewCompanyName(company.name);
            setOpenAddModal(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedCompany(company);
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
            setEditingCompanyId(null);
            setNewCompanyName('');
            setOpenAddModal(true);
          }}
        >
          + AÑADIR
        </Button>
      </Stack>

      <Box p={3}>
        <DataTable
          tableName="Empresas"
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
        <DialogTitle>¿Eliminar empresa?</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar la empresa{' '}
          <strong>{selectedCompany?.name}</strong>? Esta acción no se puede
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
        <DialogTitle>{editingCompanyId ? 'Editar empresa' : 'Añadir empresa'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la empresa"
            type="text"
            fullWidth
            variant="outlined"
            value={newCompanyName}
            onChange={e => setNewCompanyName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancelar</Button>
          <Button onClick={handleSaveCompany} variant="contained" color="primary">
            {editingCompanyId ? 'Actualizar' : 'Añadir'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
