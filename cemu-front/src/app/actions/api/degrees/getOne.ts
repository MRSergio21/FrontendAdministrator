'use server';

import axios from 'axios';
import { DegreesResponseDTO } from '../../../models/degrees.model';

export async function getDegreesByIdAction(
  id: string,
): Promise<DegreesResponseDTO | null> {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get<DegreesResponseDTO>(
      `${apiUrl}/degrees/${id}`
    );

    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
}
