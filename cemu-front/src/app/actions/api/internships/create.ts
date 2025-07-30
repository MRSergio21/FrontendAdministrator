'use server';

import axios from 'axios';
import { InternshipResponseDTO, InternshipCreationDTO } from '../../../models/interneships.model';

export async function createInternshipAction(
    data: InternshipCreationDTO,
): Promise<InternshipResponseDTO> {
    const apiUrl = process.env.apiUrl;
    console.log('Creating internship with data:', data);
    const res = await axios.post<InternshipResponseDTO>(
        `${apiUrl}/internships/`,
        data
    );

    return res.data;
}
