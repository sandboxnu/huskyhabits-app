export interface GetUserAvatarRequest {
  userId: string;
  size: 'sm' | 'md' | 'lg';
}

export interface GetUserResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  accounts: [{ acc_type: string; uid: string }];
}

export interface GetUserChallengesResponse {
  // TODO
}

export interface GetUserFriendRequestsResponse {
  // TODO
}

export interface GetUserAvatarResponse {
  // TODO
}
