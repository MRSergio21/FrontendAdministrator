'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllRequest } from '../actions/api/request/getAll';
import { getRequestByIdAction } from '../actions/api/request/getOne';
import { updateRequestAction } from '../actions/api/request/update';

import type { RequestCreationDTO, RequestResponseDTO } from '@/app/models/request.model';

// 1) LIST QUERY
export function useRequestQueryList(initialData?: RequestResponseDTO[]) {
  return useQuery({
    queryKey: ['request'],
    queryFn: getAllRequest,
    initialData,
    refetchOnWindowFocus: false,
  });
}

// 2) DETAIL QUERY
export function useRequestQuery(requestId?: string) {
  return useQuery({
    queryKey: ['request', requestId],
    queryFn: () => {
      if (!requestId) throw new Error('Missing request ID');
      return getRequestByIdAction(requestId);
    },
    enabled: Boolean(requestId),
    refetchOnWindowFocus: false,
  });
}

// 3) MUTATIONS
export function useRequestMutations() {
  const qc = useQueryClient();

  const updateDegree = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<RequestCreationDTO>;
    }) => {
      const { internship_id, ...rest } = data;
      const mappedData: Partial<RequestResponseDTO> = {
        ...rest,
        ...(internship_id !== undefined ? { internship: { id: internship_id } } : {}),
      };
      return updateRequestAction(id, mappedData);
    },
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['degrees'] });
      qc.invalidateQueries({ queryKey: ['degree', vars.id] });
    },
    onError: error => {
      console.error('Error updating degree:', error);
    },
    retry: 3,
  });

  return {
    updateDegree,
  };
}
