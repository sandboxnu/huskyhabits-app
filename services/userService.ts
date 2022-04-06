import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert } from './utils';
import { ResponseEnvelope, unwrapOrThrowError } from './utils';

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

export interface GetUserAvatarRequest {
  userId: string;
  size: 'sm' | 'md' | 'lg';
}

export interface GetUserAvatarResponse {
  // TODO
}

export default class UserServiceClient {
  private _axios: AxiosInstance;

  constructor(serviceUrl?: string) {
    const baseURL =
      serviceUrl ||
      process.env.USER_SERVICE_URL ||
      'http://10.110.54.6:3000/v1/users';
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }

  async getUserById(requestData: { userId: string }): Promise<GetUserResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetUserResponse>
    >(`/${requestData.userId}`);
    return unwrapOrThrowError(responseWrapper);
  }

  async getUserChallenges(requestData: {
    userId: string;
  }): Promise<GetUserChallengesResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetUserChallengesResponse>
    >(`/${requestData.userId}/challenges`);
    return unwrapOrThrowError(responseWrapper);
  }

  async getUserFriendRequests(requestData: {
    userId: string;
  }): Promise<GetUserFriendRequestsResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetUserFriendRequestsResponse>
    >(`/${requestData.userId}/friend_requests`);
    return unwrapOrThrowError(responseWrapper);
  }

  async getUserAvatar(
    requestData: GetUserAvatarRequest,
  ): Promise<GetUserAvatarResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetUserAvatarResponse>
    >(`/users/${requestData.userId}/avatar?size=${requestData.size}`);
    return unwrapOrThrowError(responseWrapper);
  }
}
