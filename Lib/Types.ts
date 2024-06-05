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

export interface PostMemoButtonProps {
  onPost: () => void;
  waitingStatus: boolean;
}

export interface ImageMemoForm {
  caption: string;
  memoFile: File | null;
}

export interface Memo {
  id: string;
  memo_type: "text" | "image" | "audio" | "video";
  content: string;
  caption: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
}

export interface SearchBarProps {
  apiEndpoint: string;
  resultType: "memo" | "user";
}