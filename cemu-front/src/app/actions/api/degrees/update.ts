'use server';

import axios from 'axios';
import { DegreesResponseDTO } from '../../../models/degrees.model';

export async function updateDegreesAction(
    id: string,
    data: Partial<DegreesResponseDTO>,
): Promise<void> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    await axios.put(`${apiUrl}/degrees/${id}`, data, {
    });
}
