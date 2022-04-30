import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert, ResponseEnvelope, unwrapOrThrowError } from '../utils';
import { GetUserResponse } from './types';
import store from '../../store/App.store';

export default class UserServiceClient {
  private _axios: AxiosInstance;
  private _baseURL: string;

  constructor(serviceUrl?: string) {
    const baseURL =
      serviceUrl || `http://${process.env.BACKEND_URL}/api/v1/users`;
    this._baseURL = baseURL;
    assert(baseURL);
    this._axios = axios.create({
      baseURL: this._baseURL,
      withCredentials: true,
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
   * Gets current logged in user information.
   * @returns user object
   */
  async getCurrentUser(): Promise<GetUserResponse> {
    const res = await this._axios.get<GetUserResponse>('/');
    if (!res) throw new Error('User not found.');
    return res.data;
  }

  /**
   * Gets user information for a specific user.
   * @param requestData user id
   * @returns user object
   */
  async getUserById(requestData: { userId: string }): Promise<GetUserResponse> {
    const res = await this._axios.get<GetUserResponse>(
      `/${requestData.userId}`,
    );
    if (!res) throw new Error('User not found.');
    return res.data;
  }
}
