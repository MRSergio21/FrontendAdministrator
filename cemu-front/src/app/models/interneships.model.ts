export type Modality = 'Presencial' | 'Remoto' | 'Hibrido';
export type InternshipType = 'Curricular' | 'Extracurricular';
export type Workday = 'TiempoCompleto' | 'MedioTiempo';

export interface DegreeMinimalDTO {
  id: number;
  name: string;
}

export interface CompanyMinimalDTO {
  id: number;
  name: string;
}

export interface InternshipResponseDTO {
  id: number;
  internshipTitle: string;
  internshipLocation: string;
  salary: number | null;
  modality: Modality;
  internshipType: InternshipType;
  workday: Workday;
  minimumStudies: string;
  languages: string;
  startDate: Date;
  internshipPeriod: string;
  minimumExperience: string;
  backgroundKnowledge: string;
  description: string;
  degree: DegreeMinimalDTO;
  company: CompanyMinimalDTO;
}

export interface InternshipCreationDTO {
  internshipTitle: string;
  internshipLocation: string;
  salary: number | null;
  modality: Modality;
  internshipType: InternshipType;
  workday: Workday;
  minimumStudies: string;
  languages: string;
  startDate: Date;
  period: string;
  minimumExperience: string;
  backgroundKnowledge: string;
  description: string;
  degree_id: number;
  company_id: number;
}
