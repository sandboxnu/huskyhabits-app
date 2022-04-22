import axios, { AxiosInstance } from 'axios';
import { assert } from '../utils';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';
import { GetUserResponse } from '../user/types';

export default class AuthServiceClient {
  private _axios: AxiosInstance;
  private _baseURL: string;

  constructor(serviceUrl?: string) {
    const baseURL = 'http://' + (process.env.BACKEND_URL || '') + '/auth';
    this._baseURL = baseURL;
    assert(baseURL);
    this._axios = axios.create({ baseURL, withCredentials: true });
  }

  async getUserInfo(): Promise<GetUserResponse> {
    const url = `${this._baseURL}/profile`;

    try {
      const { data } = await this._axios.get<GetUserResponse>(url);
      return data;
    } catch (err: any) {
      console.log(err);
      throw new Error('Unexpected error when getting user info.');
    }
  }

  async loginWithGoogle(redirectUri: string) {
    const url = `${this._baseURL}/google${`?auth_redirect_uri=${redirectUri}`}`;

    try {
      const resp = await WebBrowser.openAuthSessionAsync(
        url,
        (await Linking.getInitialURL()) || '',
      );

      if (resp.type == 'success') {
        const { queryParams } = Linking.parse(resp.url);
        const cookies = queryParams['cookies'];
        await SecureStore.setItemAsync(
          'auth-cookies',
          Buffer.from(cookies, 'base64').toString('ascii'),
        );
      } else {
        console.log('Oauth was cancelled.');
      }
    } catch (e) {
      return new Error(`WARNING: could not open link: ${url}`);
    }

    // Below won't work in local testing (need a web browser to open google oauth page)
    // leaving here while still in early development

    // await this._axios.get(
    //   `/google${redirectUri ? `?auth_redirect_uri=${redirectUri}` : ''}`);
  }
}
