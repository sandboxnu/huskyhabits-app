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
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getCurrentUser(): Promise<GetUserResponse> {
    const state = store.getState()


    const responseWrapper = await this._axios.get<
      GetUserResponse
    >('/', {
        headers: {
            'Cookie': state.auth.cookies,
        }
    });

    // wrap into error function
    if (responseWrapper.status < 200 || responseWrapper.status >= 300 || !responseWrapper.data) {
        throw new Error('did not work')
    }

    return responseWrapper.data;
  }

  async getUserById(requestData: { userId: string }): Promise<GetUserResponse> {
    // const responseWrapper = await this._axios.get<
    //   ResponseEnvelope<GetUserResponse>
    // >(`/${requestData.userId}`);
    const res = await this._axios.get<GetUserResponse>(
      `/${requestData.userId}`,
    );
    if (!res) throw new Error('User not found.');
    return res.data;
  }
}
