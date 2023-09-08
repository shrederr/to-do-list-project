import {atom, selector} from 'recoil';
import {Session as SessionType} from '../types/auth';
import {User as UserType} from '../types/user';

export type SessionStateType = SessionType | null | undefined;
export const session = atom<SessionStateType>({
  key: 'session',
  default: undefined,
});

export const user = selector<UserType | null>({
  key: 'user',
  get: ({get}) => {
    const s = get(session);
    if (!s) {
      return null;
    }
    return s.user;
  },
  set: ({set, get}, newValue) => {
    const s = get(session);
    if (!s) {
      return null;
    }

    set(session, {...s, user: {...s.user, ...newValue}});
  },
});
