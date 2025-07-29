// app/hooks/useFormType.tsx
'use client';

import React from 'react';
import { ModalFormType } from '../utils/modals.utils';

// Degrees
import CreateDegrees from '../components/Modal/Degrees/CreateDegrees';
import EditDegrees from '../components/Modal/Degrees/EditDegrees';
import DeleteDegrees from '../components/Modal/Degrees/DeleteDegrees';

/* Internships
import CreateInternship from '../components/Modal/Internships/CreateInternship';
import EditInternship from '../components/Modal/Internships/EditInternship';
import DeleteInternship from '../components/Modal/Internships/DeleteInternship'; */

// Companies
import CreateCompany from '../components/Modal/Companies/CreateCompanies';
import EditCompany from '../components/Modal/Companies/EditCompanies';
import DeleteCompany from '../components/Modal/Companies/DeleteCopanies';

interface FormConfig<P> {
    component: React.ComponentType<any>;
    getProps: (data?: unknown) => P;
}

const formConfig: Partial<Record<ModalFormType, FormConfig<any>>> = {
    // === Degrees ===
    [ModalFormType.CREATE_DEGREE]: {
        component: CreateDegrees,
        getProps: () => ({}),
    },
    [ModalFormType.EDIT_DEGREE]: {
        component: EditDegrees,
        getProps: data => ({
            id: (data as { id: string }).id,
        }),
    },
    [ModalFormType.DELETE_DEGREE]: {
        component: DeleteDegrees,
        getProps: data => ({
            degree: data as { id: string; name?: string },
        }),
    },

    /* === Internships ===
    [ModalFormType.CREATE_INTERNSHIP]: {
        component: CreateInternship,
        getProps: () => ({}),
    },
    [ModalFormType.EDIT_INTERNSHIP]: {
        component: EditInternship,
        getProps: data => ({
            id: (data as { id: string }).id,
        }),
    },
    [ModalFormType.DELETE_INTERNSHIP]: {
        component: DeleteInternship,
        getProps: data => ({
            internship: data as { id: string; name?: string },
        }),
    },*/

    // === Companies ===
    [ModalFormType.CREATE_COMPANY]: {
        component: CreateCompany,
        getProps: () => ({}),
    },
    [ModalFormType.EDIT_COMPANY]: {
        component: EditCompany,
        getProps: data => ({
            id: (data as { id: string }).id,
        }),
    },
    [ModalFormType.DELETE_COMPANY]: {
        component: DeleteCompany,
        getProps: data => ({
            company: data as { id: string; name?: string },
        }),
    },
};

export default function useFormType(
    type: ModalFormType | null,
    data?: unknown,
    ref?: React.Ref<any>,
): React.ReactNode {
    if (!type) return null;
    const cfg = formConfig[type];
    if (!cfg) return null;

    const { component: Component, getProps } = cfg;
    const props = getProps(data);
    return <Component ref={ref} {...props} />;
}
