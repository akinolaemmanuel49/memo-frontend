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
