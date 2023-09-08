import {useRecoilValue} from 'recoil';
import {user as userState} from '../states/session';

export const useViewer = () => {
  return useRecoilValue(userState) || null;
};
