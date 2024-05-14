export interface ProfileData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarURL: string;
  status: string;
  about: string;
  deleted: boolean;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarURL: string;
  avatarFile: File | null;
  status: string;
  about: string;
}

export interface CreateUserFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface AuthDataResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  profile: ProfileData;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
