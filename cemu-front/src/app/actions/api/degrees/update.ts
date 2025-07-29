'use server';

import axios from 'axios';
import { DegreesResponseDTO } from '../../../models/degrees.model';

export async function updateDegreesAction(
    id: string,
    data: Partial<DegreesResponseDTO>,
): Promise<void> {
    const apiUrl = process.env.apiUrl;
    await axios.put(`${apiUrl}/degrees/${id}`, data, {
    });
}
