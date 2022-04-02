import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Linking } from 'react-native';
import { assert } from './utils';
import { ResponseEnvelope, unwrapOrThrowError } from './utils';

export default class AuthServiceClient {
  private _axios: AxiosInstance;
  private _baseURL: string;

  constructor(serviceUrl?: string) {
    const baseURL =
      'http://localhost:3000/auth';
    this._baseURL = baseURL;
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }

  async loginWithGoogle(redirectUri?: string) {
    const url = `${this._baseURL}/google${redirectUri ? `?auth_redirect_uri=${redirectUri}` : ''}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.log(`WARNING: could not open link: ${url}`);
    }

    // Below won't work in local testing (need a web browser to open google oauth page)
    // leaving here while still in early development

    // await this._axios.get(
    //   `/google${redirectUri ? `?auth_redirect_uri=${redirectUri}` : ''}`);
  }
}
