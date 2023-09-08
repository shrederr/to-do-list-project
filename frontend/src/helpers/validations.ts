import {EMAIL_REGEX} from '../constants';
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const validatePassword = (value: unknown): boolean => {
  return (value as string)?.trim()?.length >= 6;
};

export const validateName = (value: unknown): boolean => {
  return (value as string)?.trim()?.length >= 2;
};

export const validateTitle = (value: unknown): boolean => {
  return (value as string)?.trim()?.length > 0;
};

export const validateEmail = (value: unknown): boolean => {
  return EMAIL_REGEX.test(value as string);
};
