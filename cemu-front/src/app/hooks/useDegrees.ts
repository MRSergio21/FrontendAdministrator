'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllDegrees } from '../actions/api/degrees/getAll';
import { getDegreesByIdAction } from '../actions/api/degrees/getOne';
import { createDegreeAction } from '../actions/api/degrees/create';
import { updateDegreesAction } from '../actions/api/degrees/update';
import { deleteDegreeByIdAction } from '../actions/api/degrees/delete';

import type {
  DegreesCreationDTO,
  DegreesResponseDTO,
} from '@/app/models/degrees.model';

// 1) LIST QUERY
export function useDegreesQuery(initialData?: DegreesResponseDTO[]) {
  return useQuery({
    queryKey: ['degrees'],
    queryFn: getAllDegrees,
    initialData,
    refetchOnWindowFocus: false,
  });
}

// 2) DETAIL QUERY
export function useDegreeQuery(degreeId?: string) {
  return useQuery({
    queryKey: ['degree', degreeId],
    queryFn: () => {
      if (!degreeId) throw new Error('Missing degree ID');
      return getDegreesByIdAction(degreeId);
    },
    enabled: Boolean(degreeId),
    refetchOnWindowFocus: false,
  });
}

// 3) MUTATIONS
export function useDegreeMutations() {
  const qc = useQueryClient();

  const createDegree = useMutation({
    mutationFn: (data: DegreesCreationDTO) => createDegreeAction(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['degrees'] });
    },
    onError: error => {
      console.error('Error creating degree:', error);
    },
    retry: 3,
  });

  const updateDegree = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<DegreesCreationDTO>;
    }) => updateDegreesAction(id, data),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['degrees'] });
      qc.invalidateQueries({ queryKey: ['degree', vars.id] });
    },
    onError: error => {
      console.error('Error updating degree:', error);
    },
    retry: 3,
  });

  const deleteDegree = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const result = await deleteDegreeByIdAction(id);
      if (typeof result === 'string') {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['degrees'] });
      qc.invalidateQueries({ queryKey: ['degree', vars.id] });
    },
    onError: error => {
      console.error('Error deleting degree:', error);
    },
    retry: 3,
  });

  return {
    createDegree,
    updateDegree,
    deleteDegree,
  };
}
