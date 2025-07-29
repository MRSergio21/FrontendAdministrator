export interface CompaniesResponseDTO {
    id: number;   
    name: string;
    companiesIds?: string[];
}

export interface CompaniesCreationDTO {
    name: string;
}