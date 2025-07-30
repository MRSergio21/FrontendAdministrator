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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CustomSearchBar } from '../components/TextField/CumstomSearchBar';
import { DataTable } from '../components/Table/DataTable';
import { useInternshipsQuery, useInternshipMutations } from '../hooks/useInternship';
import { useDegreesQuery } from '../hooks/useDegrees';
import { useCompaniesQuery } from '../hooks/useCompany';
import { useAlertStore } from '@/app/stores/alert.store';

import type { Column } from '@/app/utils/types.utils';
import type { InternshipResponseDTO } from '../models/interneships.model';

const modalityOptions = ['Presencial', 'Remoto', 'Hibrido'] as const;
const internshipTypeOptions = ['Curricular', 'Extracurricular'] as const;
const workdayOptions = ['TiempoCompleto', 'MedioTiempo'] as const;

export default function InternshipsView() {
  const { data: allInternships = [], isLoading } = useInternshipsQuery();
  const { data: degrees = [] } = useDegreesQuery();
  const { data: companies = [] } = useCompaniesQuery();

  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [page, setPage] = useQueryState('page', { defaultValue: 0, parse: Number, serialize: String });
  const [rowsPerPage, setRowsPerPage] = useQueryState('limit', {
    parse: Number,
    serialize: String,
    defaultValue: 5,
  });

  const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: 'internshipTitle' });
  const [orderDir, setOrderDir] = useQueryState<'asc' | 'desc'>('orderDir', {
    defaultValue: 'asc',
    parse: v => (v === 'desc' ? 'desc' : 'asc'),
    serialize: String,
  });

  const [selectedInternship, setSelectedInternship] = useState<InternshipResponseDTO | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    internshipTitle: '',
    internshipLocation: '',
    salary: '',
    modality: 'Presencial',
    internshipType: 'Curricular',
    workday: 'TiempoCompleto',
    minimumStudies: '',
    languages: '',
    startDate: '',
    internshipPeriod: '',
    minimumExperience: '',
    backgroundKnowledge: '',
    description: '',
    degree_id: '',
    company_id: '',
  });

  const { createInternship, updateInternship, deleteInternship } = useInternshipMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const filtered = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() ?? '';
    if (!q) return allInternships;
    return allInternships.filter(intern => intern.internshipTitle.toLowerCase().includes(q));
  }, [allInternships, searchQuery]);

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
    { id: 'internshipTitle', label: 'Título' },
    { id: 'internshipLocation', label: 'Ubicación' },
    { id: 'salary', label: 'Salario' },
    { id: 'modality', label: 'Modalidad' },
    { id: 'internshipType', label: 'Tipo' },
    { id: 'company', label: 'Empresa' },
    { id: 'actions', label: 'Acciones', align: 'right' },
  ];

  const tableData = paginated.map(intern => ({
    id: intern.id,
    internshipTitle: intern.internshipTitle,
    internshipLocation: intern.internshipLocation,
    salary: intern.salary ? `${intern.salary}€` : 'N/A',
    modality: intern.modality,
    internshipType: intern.internshipType,
    company: intern.company?.name ?? '',
    actions: (
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <IconButton
          onClick={() => {
            setEditingId(String(intern.id));
            setForm({
              internshipTitle: intern.internshipTitle,
              internshipLocation: intern.internshipLocation,
              salary: intern.salary?.toString() ?? '',
              modality: intern.modality,
              internshipType: intern.internshipType,
              workday: intern.workday,
              minimumStudies: intern.minimumStudies,
              languages: intern.languages,
              startDate: intern.startDate ? new Date(intern.startDate).toLocaleDateString() : 'Sin fecha',
              internshipPeriod: intern.internshipPeriod,
              minimumExperience: intern.minimumExperience,
              backgroundKnowledge: intern.backgroundKnowledge,
              description: intern.description,
              degree_id: String(intern.degree.id),
              company_id: String(intern.company.id),
            });
            setOpenAddModal(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedInternship(intern);
            setOpenConfirm(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
  }));

  const handleDelete = async () => {
    if (!selectedInternship) return;
    try {
      await deleteInternship.mutateAsync({ id: String(selectedInternship.id) });
      setAlert('Práctica eliminada correctamente.', 'success');
    } catch {
      setAlert('Error al eliminar la práctica.', 'error');
    } finally {
      setSelectedInternship(null);
      setOpenConfirm(false);
    }
  };

  const handleSave = async () => {
    if (!form.internshipTitle.trim()) {
      setAlert('El título es obligatorio.', 'warning');
      return;
    }
    const payload = {
      ...form,
      salary: form.salary ? Number(form.salary) : null,
      degree_id: Number(form.degree_id),
      company_id: Number(form.company_id),
      startDate: new Date(form.startDate),
    };
    try {
      if (editingId) {
        await updateInternship.mutateAsync({ id: editingId, data: payload });
        setAlert('Práctica actualizada.', 'success');
      } else {
        await createInternship.mutateAsync(payload);
        setAlert('Práctica creada.', 'success');
      }
      setForm({
        internshipTitle: '',
        internshipLocation: '',
        salary: '',
        modality: 'Presencial',
        internshipType: 'Curricular',
        workday: 'TiempoCompleto',
        minimumStudies: '',
        languages: '',
        startDate: '',
        internshipPeriod: '',
        minimumExperience: '',
        backgroundKnowledge: '',
        description: '',
        degree_id: '',
        company_id: '',
      });
      setEditingId(null);
      setOpenAddModal(false);
    } catch {
      setAlert('Error al guardar.', 'error');
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" p={3} pb={1}>
        <CustomSearchBar value={searchQuery ?? ''} onSearch={setSearchQuery} />
        <Button
          variant="text"
          sx={{ color: '#01579B', textTransform: 'none' }}
          onClick={() => {
            setEditingId(null);
            setForm({
              internshipTitle: '',
              internshipLocation: '',
              salary: '',
              modality: 'Presencial',
              internshipType: 'Curricular',
              workday: 'TiempoCompleto',
              minimumStudies: '',
              languages: '',
              startDate: '',
              internshipPeriod: '',
              minimumExperience: '',
              backgroundKnowledge: '',
              description: '',
              degree_id: '',
              company_id: '',
            });
            setOpenAddModal(true);
          }}
        >
          + AÑADIR
        </Button>
      </Stack>

      <Box p={3}>
        <DataTable
          tableName="Prácticas Profesionales"
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
          sortBy={sortBy}
          orderDirection={orderDir}
          handleChangeSort={colId => {
            setSortBy(colId);
            setOrderDir(sortBy === colId && orderDir === 'asc' ? 'desc' : 'asc');
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

      {/* Modal de confirmación */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>¿Eliminar práctica?</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar la práctica{' '}
          <strong>{selectedInternship?.internshipTitle}</strong>? Esta acción no se puede deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de crear/editar */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingId ? 'Editar práctica' : 'Añadir práctica'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
          <TextField fullWidth label="Título" value={form.internshipTitle} onChange={e => handleInputChange('internshipTitle', e.target.value)} />
          <TextField fullWidth label="Ubicación" value={form.internshipLocation} onChange={e => handleInputChange('internshipLocation', e.target.value)} />
          <TextField fullWidth label="Salario (€)" type="number" value={form.salary} onChange={e => handleInputChange('salary', e.target.value)} />

          <FormControl fullWidth>
            <InputLabel>Modalidad</InputLabel>
            <Select value={form.modality} onChange={e => handleInputChange('modality', e.target.value)} label="Modalidad">
              {modalityOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo de práctica</InputLabel>
            <Select value={form.internshipType} onChange={e => handleInputChange('internshipType', e.target.value)} label="Tipo de práctica">
              {internshipTypeOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Jornada</InputLabel>
            <Select value={form.workday} onChange={e => handleInputChange('workday', e.target.value)} label="Jornada">
              {workdayOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField fullWidth label="Estudios mínimos" value={form.minimumStudies} onChange={e => handleInputChange('minimumStudies', e.target.value)} />
          <TextField fullWidth label="Idiomas" value={form.languages} onChange={e => handleInputChange('languages', e.target.value)} />
          <TextField fullWidth label="Fecha de inicio" type="date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={e => handleInputChange('startDate', e.target.value)} />
          <TextField fullWidth label="Periodo" value={form.internshipPeriod} onChange={e => handleInputChange('internshipPeriod', e.target.value)} />
          <TextField fullWidth label="Experiencia mínima" value={form.minimumExperience} onChange={e => handleInputChange('minimumExperience', e.target.value)} />
          <TextField fullWidth label="Conocimientos previos" value={form.backgroundKnowledge} onChange={e => handleInputChange('backgroundKnowledge', e.target.value)} />
          <TextField fullWidth multiline rows={3} label="Descripción" value={form.description} onChange={e => handleInputChange('description', e.target.value)} />

          <FormControl fullWidth>
            <InputLabel>Grado asociado</InputLabel>
            <Select value={form.degree_id} onChange={e => handleInputChange('degree_id', e.target.value)} label="Grado asociado">
              {degrees.map(degree => (
                <MenuItem key={degree.id} value={degree.id}>{degree.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Empresa</InputLabel>
            <Select value={form.company_id} onChange={e => handleInputChange('company_id', e.target.value)} label="Empresa">
              {companies.map(company => (
                <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>{editingId ? 'Actualizar' : 'Añadir'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
