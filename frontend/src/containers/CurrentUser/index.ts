import React from 'react';
import {useFetchSession, useIsAppLoad} from '../../hooks/auth';

type CurrentUserProps = {
  children: React.ReactNode;
};

const CurrentUser: React.FC<CurrentUserProps> = ({children}) => {
  useFetchSession();
  const isLoad = useIsAppLoad();

  return (isLoad ? children : null) as React.ReactElement;
};

export default CurrentUser;
