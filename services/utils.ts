import { AxiosResponse } from 'axios';

export interface ResponseEnvelope<T> {
  isOK: boolean;
  message?: string;
  response?: T;
}

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

// TODO: FIX
export function unwrapOrThrowError<T>(
  response: AxiosResponse<ResponseEnvelope<T>>,
  ignoreResponse = false,
): T {
  const { data } = response;
  if (response.data.isOK) {
    if (ignoreResponse) {
      return {} as T;
    }
    assert(response.data.response);
    return response.data.response;
  }
  throw new Error(`Error processing request: ${response.data.message}`);
}
