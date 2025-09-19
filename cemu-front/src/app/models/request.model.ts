import { InternshipResponseDTO } from "./interneships.model";

export interface RequestResponseDTO {
    id?: number;
    nameStudent: string;
    lastnameStudent: string;
    email: string;
    cv: string;
    status: boolean;
    internship_id: InternshipResponseDTO;
}

export interface RequestCreationDTO {
    nameStudent: string;
    lastnameStudent: string;
    email: string;
    cv: string;
    status: boolean;
    internship_id: number;
}