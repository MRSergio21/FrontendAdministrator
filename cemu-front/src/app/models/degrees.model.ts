export interface DegreesResponseDTO {
    id: number;   
    name: string;
    degreesIds?: string[];
}

export interface DegreesCreationDTO {
    name: string;
}