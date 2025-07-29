'use server';

import axios from 'axios';

export async function deleteCompanyByIdAction(
    id: string,
): Promise<null | string> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        await axios.delete(`${apiUrl}companies/${id}`);
        return null;
    } catch (err: any) {
        if (err.response?.status === 404) return null;
        return (
            err.response?.data?.message ||
            'Error desconocido al eliminar el degree'
        );
    }
}
