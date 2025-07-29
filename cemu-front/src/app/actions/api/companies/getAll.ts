'use server';

import axios from 'axios';
import { CompaniesResponseDTO } from '../../../models/companies.models';

export async function getAllCompanies(page: any, rows: any, p0: any): Promise<
  CompaniesResponseDTO[]
> {

const apiUrl = process.env.apiUrl;
const res = await axios.get<CompaniesResponseDTO[]>(
    `${apiUrl}/companies/`
);
  return res.data;
}
