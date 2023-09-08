import {User} from './user';

export interface Session {
  sessionToken: string;
  user: User;
}

export enum AuthField {
  password = 'password',
  email = 'email',
  username = 'username',
  newPassword = 'newPassword',
  server = 'server',
}

export interface SignInValues {
  [AuthField.email]: string;
  [AuthField.password]: string;
  [AuthField.username]: string;
}
export interface ErrorsInValues extends SignInValues {
  [AuthField.server]: string;
}
export enum AuthForms {
  login = 'login',
  registration = 'registration',
}

export type AuthFormsType = AuthForms.login | AuthForms.registration;
