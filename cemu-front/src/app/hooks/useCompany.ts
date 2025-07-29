'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllCompanies } from '../actions/api/companies/getAll';
import { getCompanyByIdAction } from '../actions/api/companies/getOne';
import { createCompanyAction } from '../actions/api/companies/create';
import { updateCompanyAction } from '../actions/api/companies/update';
import { deleteCompanyByIdAction } from '../actions/api/companies/delete';

import type { CompaniesResponseDTO, CompaniesCreationDTO, } from '../models/companies.models';

// 1) LIST QUERY
export function useCompaniesQuery(initialData?: CompaniesResponseDTO[]) {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getAllCompanies,
    initialData,
    refetchOnWindowFocus: false,
  });
}

// 2) DETAIL QUERY
export function useCompanyQuery(companyId?: string) {
  return useQuery({
    queryKey: ['company', companyId],
    queryFn: () => {
      if (!companyId) throw new Error('Missing company ID');
      return getCompanyByIdAction(companyId);
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });
}

// 3) MUTATIONS
export function useCompanyMutations() {
  const qc = useQueryClient();

  const createCompany = useMutation({
    mutationKey: ['createCompany'],
    mutationFn: (data: CompaniesCreationDTO) => createCompanyAction(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['companies'] });
    },
    retry: 3,
  });

  const updateCompany = useMutation({
    mutationKey: ['updateCompany'],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CompaniesCreationDTO>;
    }) => updateCompanyAction(id, data),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['companies'] });
      qc.invalidateQueries({ queryKey: ['company', vars.id] });
    },
    retry: 3,
  });

  const deleteCompany = useMutation({
    mutationKey: ['deleteCompany'],
    mutationFn: async ({ id }: { id: string }) => {
      const errMsg = await deleteCompanyByIdAction(id);
      if (typeof errMsg === 'string') {
        throw new Error(errMsg);
      }
    },
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['companies'] });
      qc.invalidateQueries({ queryKey: ['company', vars.id] });
    },
    retry: 3,
  });

  return {
    createCompany,
    updateCompany,
    deleteCompany,
  };
}
