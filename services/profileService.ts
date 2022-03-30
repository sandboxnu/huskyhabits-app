import axios, { AxiosInstance } from 'axios';
import { assert } from './utils';
import { ResponseEnvelope, unwrapOrThrowError } from './utils';

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

  constructor(serviceUrl: string | undefined) {
    const baseURL =
      serviceUrl ||
      process.env.PROFILE_SERVICE_URL ||
      'http://localhost:8080/v1/profiles';
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }

  async createProfile(
    requestData: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {
    const responseWrapper = await this._axios.post<
      ResponseEnvelope<CreateProfileResponse>
    >('/', requestData);
    return unwrapOrThrowError(responseWrapper);
  }

  async getProfileById(
    requestData: GetProfileRequest,
  ): Promise<GetProfileResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileResponse>
    >(`/${requestData.profileId}`);
    return unwrapOrThrowError(responseWrapper);
  }

  async getFriendsForProfile(
    requestData: GetProfileFriendsRequest,
  ): Promise<GetProfileFriendsResponse> {
    const responseWrapper = await this._axios.get<
      ResponseEnvelope<GetProfileFriendsResponse>
    >(`/${requestData.profileId}/friends`);
    return unwrapOrThrowError(responseWrapper);
  }
}
