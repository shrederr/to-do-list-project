import axios, {AxiosRequestConfig} from 'axios';
import {User, UserLoginData, UserRegistrationData} from '../types/user';
import {Session} from '../types/auth';

class AuthApi {
  constructor(private serverUri: string, private axiosConfig: AxiosRequestConfig = {}) {}

  async getViewer(): Promise<User> {
    const response = await axios.get(`${this.serverUri}/auth/getViewer`, {
      ...this.axiosConfig,
    });
    console.log(response);
    return response.data;
  }

  async login(payload: UserLoginData): Promise<Session> {
    const response = await axios.post(`${this.serverUri}/auth/login`, payload, {
      ...this.axiosConfig,
    });
    return response.data;
  }

  async registration(payload: UserRegistrationData): Promise<Session> {
    const response = await axios.post(`${this.serverUri}/auth/registration`, payload, {
      ...this.axiosConfig,
    });
    return response.data;
  }
}

export default AuthApi;
