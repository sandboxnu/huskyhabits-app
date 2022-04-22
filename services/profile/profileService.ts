import axios, { AxiosInstance } from 'axios';
import { assert } from '../utils';
import { ResponseEnvelope, unwrapOrThrowError } from '../utils';
import {
  CreateProfileRequest,
  CreateProfileResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetProfileFriendsRequest,
  GetProfileFriendsResponse,
} from './types';

export default class ProfileServiceClient {
  private _axios: AxiosInstance;

  constructor(serviceUrl?: string) {
    const baseURL =
      serviceUrl || `http://${process.env.BACKEND_URL}/v1/profiles`;
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
