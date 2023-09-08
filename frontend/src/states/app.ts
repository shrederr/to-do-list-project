import {atom, selector} from 'recoil';

export type AppState = {isLoad: boolean} | null | undefined;

export const app = atom<AppState>({
  key: 'app',
  default: {isLoad: false},
});

export const isLoad = selector<boolean>({
  key: 'isLoad',
  get: ({get}) => {
    const s = get(app);
    if (!s) return false;
    return s.isLoad;
  },

  set: ({set, get}, newValue) => {
    const s = get(app);

    if (!s) {
      return null;
    }

    set(app, {...s, isLoad: !!newValue});
  },
});
