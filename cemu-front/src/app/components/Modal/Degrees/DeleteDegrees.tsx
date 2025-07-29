'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { useAlertStore } from '@/app/stores/alert.store';
import { useDegreeMutations } from '@/app/hooks/useDegrees';

type Props = {
  degree: { id: string; name?: string };
};

export type DeleteDegreeRef = { submit: () => Promise<{ success: boolean }> };

const DeleteDegree = forwardRef<DeleteDegreeRef, Props>(function DeleteDegree(
  { degree }: Props,
  ref,
) {
  const { deleteDegree } = useDegreeMutations();
  const setAlert = useAlertStore(state => state.setAlert);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        await deleteDegree.mutateAsync({ id: degree.id });
        setAlert('Grado eliminado correctamente', 'success');
        return { success: true };
      } catch (err: any) {
        const message = err instanceof Error ? err.message : String(err);
        setAlert(`Error al eliminar grado: ${message}`, 'error');
        return { success: false };
      }
    },
  }));

  return (
    <form>
      <p>
        ¿Está seguro que desea eliminar el grado{' '}
        <strong>{degree.name ?? degree.id}</strong>? Esta acción es permanente y
        no se puede deshacer.
      </p>
    </form>
  );
});

export default DeleteDegree;
