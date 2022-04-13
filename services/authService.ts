import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert } from './utils';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch } from '../store/App.hooks';
import { AuthAction } from '../store/Auth.action';

export default class AuthServiceClient {
  private _axios: AxiosInstance;
  private _baseURL: string;

  constructor(serviceUrl?: string) {
    const baseURL =
      'http://10.110.54.6:3000';
    this._baseURL = baseURL;
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }


  async loginWithGoogle(redirectUri: string) {
    const url = `${this._baseURL}/auth/google${`?auth_redirect_uri=${redirectUri}`}`;


    try {
      const resp = await WebBrowser.openAuthSessionAsync(url, await Linking.getInitialURL() || '');
      
      if (resp.type == 'success') {
        const {queryParams} = Linking.parse(resp.url)

        const cookies = queryParams['cookies']
        await SecureStore.setItemAsync('auth-cookies', Buffer.from(cookies, 'base64').toString('ascii'))
      }
      
      
    } catch(e) {
      console.log(e);
      return new Error(`WARNING: could not open link: ${url}`);
    }

    // Below won't work in local testing (need a web browser to open google oauth page)
    // leaving here while still in early development

    // await this._axios.get(
    //   `/google${redirectUri ? `?auth_redirect_uri=${redirectUri}` : ''}`);
  }
}
