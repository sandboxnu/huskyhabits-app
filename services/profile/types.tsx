export interface CreateProfileRequest {
  username: string;
  bio?: string;
}

export interface CreateProfileResponse {
  profileId: string;
}

export interface GetProfileRequest {
  profileId: string;
}

export interface GetProfilePhotoRequest {
  profileId: string;
  size: 'sm' | 'md' | 'lg';
}

export interface SetProfilePhotoRequest {
  profileId: string;
  photo: string; // photo uri
}

export interface GetProfileResponse {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  photo: { data: Buffer; contentType: string };
}

export interface GetProfilePhotoResponse {
  // TODO
}

export interface SetProfilePhotoResponse {
  profile: GetProfileResponse;
}

export interface GetProfileFriendsRequest {
  profileId: string;
}

export interface GetProfileFriendsResponse {
  friends: [
    {
      username: string;
      bio: string;
      photo: {
        data: Buffer;
        contentType: string;
      };
    },
  ];
}

export interface GetProfileChallengesResponse {
  // TODO
}

export interface GetProfileFriendRequestsResponse {
  // TODO
}
