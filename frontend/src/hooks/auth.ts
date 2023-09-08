import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {getToken, setToken} from '../libs/auth';
import {isLoad} from '../states/app';
import {session as sessionState, SessionStateType} from '../states/session';
import AuthApi from '../api/auth';
import {isString, validateEmail, validateName, validatePassword} from '../helpers/validations';
import {useViewer} from './user';
import {redirect} from 'react-router-dom';
import {AuthField, AuthForms, ErrorsInValues, SignInValues} from '../types/auth';
import {serverErrorHandler} from '../helpers/error';
import {withToken} from '../libs/auth';
import {SERVER_URI} from '../constants/env';
import {route} from '../constants/routes';

export const useIsAuthenticated = (): boolean => {
  return isString(useViewer()?.email);
};

const validateSignInValues = (
  values: Partial<SignInValues>,
  setError: Dispatch<SetStateAction<Partial<ErrorsInValues>>>,
  form: AuthForms,
): boolean => {
  const emailValid = validateEmail(values.email);
  const passwordValid = validatePassword(values.password);
  const nameValid = validateName(values.username);
  if (form === AuthForms.login) {
    if (!emailValid) setError((prev) => ({...prev, ['email']: 'The entered email is not valid'}));
    if (!passwordValid)
      setError((prev) => ({...prev, ['password']: 'Password must be more than 6 characters and less than 16'}));
  } else if (form === AuthForms.registration) {
    if (!emailValid) setError((prev) => ({...prev, ['email']: 'The entered email is not valid'}));
    if (!passwordValid)
      setError((prev) => ({...prev, ['password']: 'Password must be more than 6 characters and less than 16'}));
    if (!nameValid) setError((prev) => ({...prev, ['username']: 'Name cannot be less than 2 characters'}));
  }
  return emailValid && passwordValid && (form !== AuthForms.registration || nameValid);
};

export function useFetchSession() {
  const setSession = useSetRecoilState(sessionState);
  const setIsLoad = useSetRecoilState(isLoad);
  const authApi = new AuthApi(SERVER_URI, withToken({headers: null}));
  console.log(SERVER_URI);
  useEffect(() => {
    const _fetchData = async (): Promise<boolean> => {
      let userData;
      let token;
      try {
        token = await getToken();
        if (!token) {
          setSession(null);
          setIsLoad(true);
          return false;
        }
        const result = await authApi.getViewer();
        console.log(result);
        if (!result) {
          setToken(null);
          setSession(null);
          setIsLoad(true);
          return false;
        }
        userData = result;
      } catch (e) {
        userData = {
          email: null,
          name: null,
        };
      }
      if (userData && !userData.email) {
        setToken(null);
        setSession(null);
        setIsLoad(true);
        return false;
      }
      setSession({
        sessionToken: token,
        user: {email: userData.email, name: userData.name},
      } as SessionStateType);
      setIsLoad(true);
      return true;
    };

    _fetchData();
  }, [setSession]);
}
export const useIsAppLoad = (): boolean => {
  return useRecoilValue(isLoad);
};

type SignInType = () => {
  values: Partial<SignInValues>;
  onChange: (next: {name: keyof SignInValues; value: string}) => void;
  onSubmit: (form: AuthForms) => Promise<void>;
  errors: Partial<ErrorsInValues>;
  loading: boolean;
  cleanState: () => void;
};
export const useAuth: SignInType = () => {
  const setSession = useSetRecoilState(sessionState);
  const authApi = new AuthApi(SERVER_URI);
  const [errors, setError] = useState<Partial<ErrorsInValues>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<Partial<SignInValues>>({
    [AuthField.email]: '',
    [AuthField.password]: '',
    [AuthField.username]: '',
  });
  const cleanState = () => {
    setError({});
    setValues({[AuthField.email]: '', [AuthField.password]: '', [AuthField.username]: ''});
  };
  const changeValue = (next: {name: keyof SignInValues; value: string}): void => {
    setError({});
    setValues((prev) => ({...prev, [next.name]: next.value}));
  };
  const auth = async (form: AuthForms) => {
    if (validateSignInValues(values, setError, form)) {
      setLoading(true);

      try {
        const response =
          form === AuthForms.login
            ? await authApi.login({email: values.email as string, password: values.password as string})
            : await authApi.registration({
                email: values.email as string,
                password: values.password as string,
                name: values.username as string,
              });
        if (!response) {
          setLoading(false);
        }
        setSession(response);
        setToken(response.sessionToken);
        redirect(route.main);
      } catch (e) {
        setError((prev) => ({...prev, ['server']: serverErrorHandler(e)}));
        setLoading(false);
      }
    }
  };
  return {
    onSubmit: auth,
    values,
    onChange: changeValue,
    loading,
    cleanState,
    errors,
  };
};
//hardcode to fix
type SignOutType = () => {
  signOut: () => void;
};
export const useSignOut: SignOutType = () => {
  const setSession = useSetRecoilState(sessionState);

  const signOut = () => {
    setToken(null);
    setSession(null);
    redirect(route.main);
    return true;
  };

  return {signOut};
};
