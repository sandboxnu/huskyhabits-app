import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import { store } from '../../store/App.store';
import { assert } from '../utils';
import {
  CreateProfileRequest,
  CreateProfileResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetProfileFriendsRequest,
  GetProfileFriendsResponse,
  GetProfilePhotoRequest,
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

  async createProfile(
    requestData: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {
    const res = await this._axios.post<{ _id: string }>('/', requestData);
    if (!res) throw new Error('Profile could not be created.');

    const newProfileObj: CreateProfileResponse = {
      profileId: res.data._id
    }
    return newProfileObj;
  }

  async getProfileById(
    requestData: GetProfileRequest,
  ): Promise<GetProfileResponse> {
    const res = await this._axios.get<GetProfileResponse>(
      `/${requestData.profileId}`,
    );
    if (!res) throw new Error('Profile not found.');
    return res.data;
  }

  async getProfileAvatar(
    requestData: GetProfilePhotoRequest,
  ): Promise<GetProfilePhotoResponse> {
    const res = await this._axios.get<GetProfilePhotoResponse>(
      `/${requestData.profileId}/photo?size=${requestData.size}`,
    );
    if (!res) throw new Error('Profile photo not found.');
    return res.data;
  }

  async setProfileAvatar(
    requestData: SetProfilePhotoRequest,
  ): Promise<SetProfilePhotoResponse> {

    const form = new FormData();
    const fileObj2 = {
      // uri: requestData.photo,
      uri: 'https://th-thumbnailer.cdn-si-edu.com/9UrydtZErwwxVrzQRr4EmWfGAjk=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/Blobfish-ugly-470.jpg',
      name: 'Blobfish-ugly-470.jpg',
      type: 'image/jpeg',
    };
    form.append('photo', fileObj2);

    console.log(form);

    try {
      const res = await this._axios.post<SetProfilePhotoResponse>(
        `/${requestData.profileId}/photo`,
        form, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(res);
      if (!res) throw new Error('Profile photo not found.');
      return res.data;
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  // TODO

  async getFriendsForProfile(
    requestData: GetProfileFriendsRequest,
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
