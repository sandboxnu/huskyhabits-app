import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert } from './utils';
import { ResponseEnvelope, unwrapOrThrowError } from './utils';

export default class AuthServiceClient {
  private _axios: AxiosInstance;

  constructor(serviceUrl: string | undefined) {
    const baseURL =
      serviceUrl ||
      process.env.USER_SERVICE_URL ||
      'http://localhost:8080/v1/auth';
    assert(baseURL);
    this._axios = axios.create({ baseURL });
  }

  async loginWithGoogle() {
    const responseWrapper = await this._axios.get('google');
    return unwrapOrThrowError(responseWrapper);
  }
}
