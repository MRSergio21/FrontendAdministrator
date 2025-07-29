'use server';

import axios from 'axios';
import { CompaniesResponseDTO } from '../../../models/companies.models';

export async function updateCompanyAction(
    id: string,
    data: Partial<CompaniesResponseDTO>,
): Promise<void> {
    const apiUrl = process.env.apiUrl;
    await axios.put(`${apiUrl}/companies/${id}`, data, {
    });
}
