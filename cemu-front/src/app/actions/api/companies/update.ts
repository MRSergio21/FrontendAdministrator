'use server';

import axios from 'axios';
import { CompaniesResponseDTO } from '../../../models/companies.models';

export async function updateCompanyAction(
    id: string,
    data: Partial<CompaniesResponseDTO>,
): Promise<void> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    await axios.put(`${apiUrl}/companies/${id}`, data, {
    });
}
