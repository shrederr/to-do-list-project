import Cookies from 'js-cookie';

type TokenType = string | null | undefined;
export const getToken = (): TokenType => {
  return Cookies.get('token');
};

export const setToken = (token: TokenType): TokenType | void => {
  if (!token) {
    return Cookies.remove('token');
  }
  return Cookies.set('token', token, {expires: 1});
};
type HeaderType = {
  [key: string]: string;
};
export const withToken = ({headers}: {headers: HeaderType | null}) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
  };
};
