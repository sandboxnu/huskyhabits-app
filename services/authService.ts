import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert } from './utils';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { ResponseEnvelope, unwrapOrThrowError } from './utils';
import Constants from 'expo-constants';
import { EventType } from 'expo-linking';
import { Link } from '@react-navigation/native';

export default class AuthServiceClient {
  private _axios: AxiosInstance;
  private _baseURL: string;

  constructor(serviceUrl?: string) {
    const baseURL =
      'http://10.110.54.6:3000/auth';
    this._baseURL = baseURL;
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }

  // handle redirects after auth0 authentication
   handleUrl = ({url}: any) => {
    console.log({url});
    WebBrowser.dismissBrowser();
  }

  async loginWithGoogle(redirectUri: string) {
    Linking.addEventListener('url', this.handleUrl);
    const url = `${this._baseURL}/google${`?auth_redirect_uri=${redirectUri}`}`;
    const successURL = `${this._baseURL}/success`;

    try {
      await Linking.canOpenURL(url);
      const redirect = await Linking.getInitialURL();
      if (!redirect) {
        return new Error(`WARNING: could not open link: ${url}`);
      }

      Linking.addEventListener('url', (event: EventType) => {
        console.log(event.url)
        if (event.url == successURL) {
              WebBrowser.dismissBrowser()
          }
      })

      await WebBrowser.openBrowserAsync(url);
      
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
