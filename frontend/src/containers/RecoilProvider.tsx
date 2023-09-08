import React from 'react';
import {RecoilRoot} from 'recoil';
import {session} from '../states/session';
interface Props {
  children?: React.ReactNode;
}
const RecoilProvider: React.FC<Props> = ({children}) => {
  return (
    <RecoilRoot
      initializeState={({set}) => {
        set(session, null);
      }}>
      {children}
    </RecoilRoot>
  );
};

export default RecoilProvider;
