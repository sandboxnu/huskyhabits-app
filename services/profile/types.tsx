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

export interface SetProfilePhotoRequest {
  profileId: string;
  photo: string; // photo uri
}

export interface GetProfileResponse {
  userId: string;
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
