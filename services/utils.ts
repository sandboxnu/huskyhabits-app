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

export function unwrapOrThrowError<T>(
  response: AxiosResponse<ResponseEnvelope<T>>,
  ignoreResponse = false,
): T {
  try {
    if (response.data.isOK) {
      if (ignoreResponse) {
        return {} as T;
      }
      assert(response.data.response);
      return response.data.response;
    }
  } catch (err: any) {
    console.log(err);
    throw new Error(`Error processing request: ${err.message}`);
  }
}
