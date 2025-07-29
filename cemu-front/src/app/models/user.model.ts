export interface ServiceUserCreationDTO {
  username: string;
  email: string;
  password: string;
}

export interface ServiceUserEditDTO {
  username: string;
  email: string;
  password?: string;
}

export interface ServiceUserResponseDTO {
  id: string;
  username: string;
  email: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
}
