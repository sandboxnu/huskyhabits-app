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

export interface GetProfileResponse {
  userId: string;
  username: string;
  bio: string;
  photo: { data: Buffer; contentType: string };
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

export interface GetProfileAvatarRequest {
  userId: string;
  size: 'sm' | 'md' | 'lg';
}
export interface GetProfileChallengesResponse {
  // TODO
}

export interface GetProfileFriendRequestsResponse {
  // TODO
}

export interface GetProfileAvatarResponse {
  // TODO
}
