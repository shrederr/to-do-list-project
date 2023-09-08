import {AxiosError} from 'axios';

export function serverErrorHandler(error: any) {
  if (error instanceof AxiosError) {
    return error?.response?.data.message || '';
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Some server error';
}
