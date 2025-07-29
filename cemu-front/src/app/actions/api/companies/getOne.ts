'use server';

import axios from 'axios';
import { CompaniesResponseDTO } from '../../../models/companies.models';

export async function getCompanyByIdAction(
  id: string,
): Promise<CompaniesResponseDTO | null> {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get<CompaniesResponseDTO>(
      `${apiUrl}/companies/${id}`
    );

    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
}
