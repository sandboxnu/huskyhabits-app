import axios, { AxiosInstance } from 'axios';
import { store } from '../../store/App.store';
import { GetUserResponse } from '../user/types';
import { assert } from '../utils';
import { ResponseEnvelope, unwrapOrThrowError } from '../utils';
import {
  CreateProfileRequest,
  CreateProfileResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetProfileFriendsRequest,
  GetProfileFriendsResponse,
  GetProfileAvatarRequest,
  GetProfileAvatarResponse,
  GetProfileChallengesResponse,
  GetProfileFriendRequestsResponse,
} from './types';

export default class ProfileServiceClient {
  private _axios: AxiosInstance;
  private _baseURL: string;

  constructor(serviceUrl?: string) {
    const baseURL =
      serviceUrl || `http://${process.env.BACKEND_URL}/api/v1/profiles`;
    this._baseURL = baseURL;
    assert(baseURL);
    this._axios = axios.create({
      baseURL: this._baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createProfile(
    requestData: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {
    const state = store.getState();
    const res = await this._axios.post<CreateProfileResponse>
    ('/', requestData, {
      headers: {
        'Cookie': state.auth.cookies
      }
    });
    if (!res) {
      throw new Error('eww');
    }
    return res.data;
  }

  async getProfileById(
    requestData: GetProfileRequest,
  ): Promise<GetProfileResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileResponse>
    >(`/${requestData.profileId}`, {
      headers: {
        'Cookie': store.getState().auth.cookies
      }
    });
    return unwrapOrThrowError(responseWrapper);
  }

  async getFriendsForProfile(
    requestData: GetProfileFriendsRequest,
  ): Promise<GetProfileFriendsResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileFriendsResponse>
    >(`/${requestData.profileId}/friends`, {
      headers: {
        'Cookie': store.getState().auth.cookies
      }
    });
    return unwrapOrThrowError(responseWrapper);
  }

  async getProfileChallenges(requestData: {
    userId: string;
  }): Promise<GetProfileChallengesResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileChallengesResponse>
    >(`/${requestData.userId}/challenges`, {
      headers: {
        'Cookie': store.getState().auth.cookies
      }
    });
    return unwrapOrThrowError(responseWrapper);
  }

  async getProfileFriendRequests(requestData: {
    userId: string;
  }): Promise<GetProfileFriendRequestsResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileFriendRequestsResponse>
    >(`/${requestData.userId}/friend_requests`, {
      headers: {
        'Cookie': store.getState().auth.cookies
      }
    });
    return unwrapOrThrowError(responseWrapper);
  }

  async getProfileAvatar(
    requestData: GetProfileAvatarRequest,
  ): Promise<GetProfileAvatarResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileAvatarResponse>
    >(`/users/${requestData.userId}/avatar?size=${requestData.size}`, {
      headers: {
        'Cookie': store.getState().auth.cookies
      }
    });
    return unwrapOrThrowError(responseWrapper);
  }
}
