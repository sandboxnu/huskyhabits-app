import axios, { AxiosInstance } from 'axios';
import { assert } from './utils';
import { ResponseEnvelope, unwrapOrThrowError } from './utils';
import store from '../store/App.store';

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
      photo: { data: Buffer; contentType: string };
    },
  ];
}

export default class ProfileServicesClient {
  private _axios: AxiosInstance;

  constructor(serviceUrl?: string) {
    const baseURL =
      serviceUrl ||
      `http://${process.env.BACKEND_URL}/v1/profiles`;
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }

  async createProfile(
    requestData: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {

    const state = store.getState()
    const responseWrapper = await this._axios.post<
      ResponseEnvelope<CreateProfileResponse>
    >('/', requestData, {
        headers: {
            'Cookie': state.auth.cookies,
        }
    });
    return unwrapOrThrowError(responseWrapper);
  }

  async getProfileById(
    requestData: GetProfileRequest,
    authCookies: string,
  ): Promise<GetProfileResponse> {
    const state = store.getState()

    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileResponse>
    >(`/${requestData.profileId}`, {
        headers: {
            'Cookie': state.auth.cookies,
        }
    });
    return unwrapOrThrowError(responseWrapper);
  }

  async getFriendsForProfile(
    requestData: GetProfileFriendsRequest,
    authCookies: string,
  ): Promise<GetProfileFriendsResponse> {
    const state = store.getState()

    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileFriendsResponse>
    >(`/${requestData.profileId}/friends`, {
        headers: {
            'Cookie': state.auth.cookies,
        }
    });
    return unwrapOrThrowError(responseWrapper);
  }
}
