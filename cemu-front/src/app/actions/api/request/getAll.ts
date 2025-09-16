'use server';

import axios from 'axios';
import { RequestResponseDTO } from '../../../models/request.model';

export async function getAllRequest(): Promise<
  RequestResponseDTO[]
> {

const apiUrl = process.env.apiUrl;
const res = await axios.get<RequestResponseDTO[]>(
    `${apiUrl}/requests/`
);
  return res.data;
}
