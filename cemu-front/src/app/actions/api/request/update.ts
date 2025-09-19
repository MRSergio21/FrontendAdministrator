'use server';

import axios from 'axios';
import { RequestResponseDTO } from '../../../models/request.model';

export async function updateRequestAction(
    id: string,
    data: Partial<RequestResponseDTO>,
): Promise<void> {
    const apiUrl = process.env.apiUrl;
    await axios.put(`${apiUrl}/requests/${id}`, data, {
    });
}
