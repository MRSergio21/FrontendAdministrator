'use server';

import axios from 'axios';
import { DegreesResponseDTO } from '../../../models/degrees.model';

export async function getAllDegrees(): Promise<
  DegreesResponseDTO[]
> {

const apiUrl = process.env.apiUrl;
const res = await axios.get<DegreesResponseDTO[]>(
    `${apiUrl}/degrees/`
);
  return res.data;
}
