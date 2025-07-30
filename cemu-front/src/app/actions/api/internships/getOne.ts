'use server';

import axios from 'axios';
import { InternshipResponseDTO } from '../../../models/interneships.model';

export async function getInternshipByIdAction(
  id: string,
): Promise<InternshipResponseDTO | null> {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get<InternshipResponseDTO>(
      `${apiUrl}/internships/${id}`
    );

    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
}
