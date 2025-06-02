export interface SiteRoleDTO {
  id: string;
  siteId: string;
  role: string;
}

export interface ProfileEmailDTO {
  id: string;
  email: string;
  active: boolean;
  roles: SiteRoleDTO[];
}

export interface ProfileResponseDTO {
  id: string;
  profilename: string;
  createdAt: Date;
  updatedAt: Date;
  emails: ProfileEmailDTO[];
}

export interface ProfileCreationDTO {
  profilename: string;
  emails: {
    email: string;
    active: boolean;
    roles?: { siteId: string; role: string }[];
  }[];
}
