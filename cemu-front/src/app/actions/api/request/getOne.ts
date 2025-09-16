'use server';

import axios from 'axios';
import { RequestResponseDTO } from '../../../models/request.model';

export async function getRequestByIdAction(
  id: string,
): Promise<RequestResponseDTO | null> {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get<RequestResponseDTO>(
      `${apiUrl}/requests/${id}`
    );

    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
}
