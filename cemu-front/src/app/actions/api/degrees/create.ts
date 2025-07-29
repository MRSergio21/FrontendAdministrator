'use server';

import axios from 'axios';
import { DegreesResponseDTO, DegreesCreationDTO } from '../../../models/degrees.model';

export async function createDegreeAction(
    data: DegreesCreationDTO,
): Promise<DegreesResponseDTO> {
    const apiUrl = process.env.apiUrl;
    const res = await axios.post<DegreesResponseDTO>(
        `${apiUrl}/degrees/`,
        data
    );

    return res.data;
}
