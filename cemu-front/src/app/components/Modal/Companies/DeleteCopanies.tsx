'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { useAlertStore } from '@/app/stores/alert.store';
import { useCompanyMutations } from '../../../hooks/useCompany';

type Props = {
  company: { id: string; name?: string };
};

export type DeleteCompanyRef = { submit: () => Promise<{ success: boolean }> };

const DeleteCompany = forwardRef<DeleteCompanyRef, Props>(function DeleteCompany(
  { company }: Props,
  ref,
) {
  const { deleteCompany } = useCompanyMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        await deleteCompany.mutateAsync({ id: company.id });
        setAlert('Empresa eliminada correctamente', 'success');
        return { success: true };
      } catch (err: any) {
        const message = err instanceof Error ? err.message : String(err);
        setAlert(`Error al eliminar empresa: ${message}`, 'error');
        return { success: false };
      }
    },
  }));

  return (
    <form>
      <p>
        ¿Está seguro que desea eliminar la empresa{' '}
        <strong>{company.name ?? company.id}</strong>? Esta acción es permanente y
        no se puede deshacer.
      </p>
    </form>
  );
});

export default DeleteCompany;
