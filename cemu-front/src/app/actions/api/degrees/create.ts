'use server';

import axios from 'axios';
import { DegreesResponseDTO, DegreesCreationDTO } from '../../../models/degrees.model';

export async function createDegreeAction(
    data: DegreesCreationDTO,
): Promise<DegreesResponseDTO> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post<DegreesResponseDTO>(
        `${apiUrl}/degrees/`
    );

    return res.data;
}
