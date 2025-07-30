'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllInternships } from '../actions/api/internships/getAll';
import { getInternshipByIdAction } from '../actions/api/internships/getOne';
import { createInternshipAction } from '../actions/api/internships/create';
import { updateInternshipAction } from '../actions/api/internships/update';
import { deleteInternshipByIdAction } from '../actions/api/internships/delete';

import type {
  InternshipResponseDTO,
  InternshipCreationDTO,
} from '../models//interneships.model';

// 1) LIST QUERY
export function useInternshipsQuery(initialData?: InternshipResponseDTO[]) {
  return useQuery({
    queryKey: ['internships'],
    queryFn: getAllInternships,
    initialData,
    refetchOnWindowFocus: false,
  });
}

// 2) DETAIL QUERY
export function useInternshipQuery(internshipId?: string) {
  return useQuery({
    queryKey: ['internship', internshipId],
    queryFn: () => {
      if (!internshipId) throw new Error('Missing internship ID');
      return getInternshipByIdAction(internshipId);
    },
    enabled: Boolean(internshipId),
    refetchOnWindowFocus: false,
  });
}

// 3) MUTATIONS
export function useInternshipMutations() {
  const qc = useQueryClient();

  const createInternship = useMutation({
    mutationKey: ['createInternship'],
    mutationFn: (data: InternshipCreationDTO) => createInternshipAction(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internships'] });
    },
    retry: 3,
  });

  const updateInternship = useMutation({
    mutationKey: ['updateInternship'],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<InternshipCreationDTO>;
    }) => updateInternshipAction(id, data),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['internships'] });
      qc.invalidateQueries({ queryKey: ['internship', vars.id] });
    },
    retry: 3,
  });

  const deleteInternship = useMutation({
    mutationKey: ['deleteInternship'],
    mutationFn: async ({ id }: { id: string }) => {
      const errMsg = await deleteInternshipByIdAction(id);
      if (typeof errMsg === 'string') {
        throw new Error(errMsg);
      }
    },
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['internships'] });
      qc.invalidateQueries({ queryKey: ['internship', vars.id] });
    },
    retry: 3,
  });

  return {
    createInternship,
    updateInternship,
    deleteInternship,
  };
}
