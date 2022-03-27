import { AxiosResponse } from "axios";
import assert from 'assert';

export interface ResponseEnvelope<T> {
  isOK: boolean;
  message?: string;
  response?: T;
}

export function unwrapOrThrowError<T>(response: AxiosResponse<ResponseEnvelope<T>>, ignoreResponse = false): T {
  if (response.data.isOK) {
    if (ignoreResponse) {
      return {} as T;
    }
    assert(response.data.response);
    return response.data.response;
  }
  throw new Error(`Error processing request: ${response.data.message}`);
}