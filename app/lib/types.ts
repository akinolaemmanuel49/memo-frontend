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
  about: string;
}

export interface ProfilePictureData {
  avatarFile: File;
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

export interface UploadProfilePictureProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export interface TextMemoForm {
  content: string;
}

export interface DeleteProfilePictureButtonProps {
  onDeletePicture: () => void;
  pictureStatus: string;
}

export interface PostTextMemoButtonProps {
  onPost: () => void;
  waitingStatus: boolean;
}
