import React, {useEffect, useState} from 'react';
import {HeaderComponent} from '../../componets/Layout/header';
import {user as userState} from '../../states/session';
import {useRecoilValue} from 'recoil';

export const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const user = useRecoilValue(userState);
  useEffect(() => {
    setUsername(user ? user.name : null);
  }, [user]);
  return <HeaderComponent username={username} />;
};
