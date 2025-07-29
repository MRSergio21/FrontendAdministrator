'use server';

import axios from 'axios';
import { CompaniesResponseDTO, CompaniesCreationDTO } from '../../../models/companies.models';

export async function createCompanyAction(
    data: CompaniesCreationDTO,
): Promise<CompaniesResponseDTO> {
    const apiUrl = process.env.apiUrl;
    const res = await axios.post<CompaniesResponseDTO>(
        `${apiUrl}/companies/`,
        data
    );

    return res.data;
}
