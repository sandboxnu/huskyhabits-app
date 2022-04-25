import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import { store } from '../../store/App.store';
import { assert } from '../utils';
import {
  CreateProfileRequest,
  CreateProfileResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetProfileFriendsResponse,
  GetProfilePhotoResponse,
  GetProfileChallengesResponse,
  GetProfileFriendRequestsResponse,
  SetProfilePhotoRequest,
  SetProfilePhotoResponse,
} from './types';

declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}

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

    // add cookies to every request
    this._axios.interceptors.request.use(
      (config) => {
        config.headers!['Cookie'] = store.getState().auth.cookies;
        return config;
      },
      (error) => {
        console.log(error.message);
        throw new Error(error.message);
      },
    );
  }

  /**
   * Creates a profile for a given user.
   * @param requestData username and (optional) bio
   * @returns newly created profile id
   */
  async createProfile(
    requestData: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {
    const res = await this._axios.post<CreateProfileResponse>('/', requestData);
    if (!res) throw new Error('Profile could not be created.');
    return res.data;
  }

  /**
   * Gets profile information for a specific profile.
   * @param requestData profile id
   * @returns profile object
   */
  async getProfileById(
    requestData: GetProfileRequest,
  ): Promise<GetProfileResponse> {
    const res = await this._axios.get<GetProfileResponse>(
      `/${requestData.profileId}`,
    );
    if (!res) throw new Error('Profile not found.');
    return res.data;
  }

  /**
   * Gets profile photo object for a specific profile.
   * @param requestData profile id
   * @returns ProfilePhoto object
   */
  async getProfilePhoto(
    requestData: GetProfileRequest,
  ): Promise<GetProfilePhotoResponse> {
    const res = await this._axios.get<GetProfilePhotoResponse>(
      `/${requestData.profileId}/photo`,
    );
    if (!res) throw new Error('Profile photo not found.');
    return res.data; // { data: Buffer, contentType: String }
  }

  /**
   * Sets profile photo object for a specific profile.
   * @param requestData profile id and profile photo object
   * @returns updated profile object
   */
  async setProfilePhoto(
    requestData: SetProfilePhotoRequest,
  ): Promise<SetProfilePhotoResponse> {
    const photoData = new global.FormData();
    const fileObj: FormDataValue = {
      uri: requestData.photo,
      name: 'profile-pic',
      type: 'image/png',
    };
    photoData.append('file', fileObj);

    try {
      const res = await this._axios.post<SetProfilePhotoResponse>(
        `/${requestData.profileId}/photo`,
        photoData,
      );
      if (!res) throw new Error('Profile photo not found.');
      return res.data;
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  // TODO

  async getFriendsForProfile(
    requestData: GetProfileRequest,
  ): Promise<GetProfileFriendsResponse> {
    const res = await this._axios.get<GetProfileFriendsResponse>(
      `/${requestData.profileId}/friends`,
    );
    if (!res) throw new Error('Friends not found.');
    return res.data;
  }

  async getProfileChallenges(requestData: {
    userId: string;
  }): Promise<GetProfileChallengesResponse> {
    const res = await this._axios.get<GetProfileChallengesResponse>(
      `/${requestData.userId}/challenges`,
    );
    if (!res) throw new Error('Challenges not found.');
    return res.data;
  }

  async getProfileFriendRequests(requestData: {
    userId: string;
  }): Promise<GetProfileFriendRequestsResponse> {
    const res = await this._axios.get<GetProfileFriendRequestsResponse>(
      `/${requestData.userId}/friend_requests`,
    );
    if (!res) throw new Error('Friend requests not found.');
    return res.data;
  }
}
