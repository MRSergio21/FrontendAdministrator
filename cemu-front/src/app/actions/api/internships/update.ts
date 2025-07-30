'use server';

import axios from 'axios';
import { InternshipResponseDTO } from '../../../models/interneships.model';

export async function updateInternshipAction(
    id: string,
    data: Partial<InternshipResponseDTO>,
): Promise<void> {
    const apiUrl = process.env.apiUrl;
    await axios.put(`${apiUrl}/internships/${id}`, 
        data, {
    });
}
