'use server';

import axios from 'axios';

export async function deleteInternshipByIdAction(
    id: string,
): Promise<null | string> {
    const apiUrl = process.env.apiUrl;
    try {
        await axios.delete(`${apiUrl}/internships/${id}`);
        return null;
    } catch (err: any) {
        if (err.response?.status === 404) return null;
        return (
            err.response?.data?.message ||
            'Error desconocido al eliminar el degree'
        );
    }
}
