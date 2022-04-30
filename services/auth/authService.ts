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
    this._axios = axios.create({
      baseURL: this._baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async loginWithGoogle(redirectUri: string) {
    const url = `${this._baseURL}/google`;
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
    } catch (err: any) {
      return new Error(`could not open link: ${url}: ${err.message}`);
    }

    // Below won't work in local testing (need a web browser to open google oauth page)
    // leaving here while still in early development

    // await this._axios.get(
    //   `/google${redirectUri ? `?auth_redirect_uri=${redirectUri}` : ''}`);
  }
}
