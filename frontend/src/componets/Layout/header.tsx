import React from 'react';
import {HeaderWrapper, Logo, HeaderContentWrapper} from './styles';
interface Props {
  username: string | null;
}
export const HeaderComponent: React.FC<Props> = ({username}) => {
  return (
    <HeaderWrapper>
      <HeaderContentWrapper>
        <Logo>
          {!username
            ? 'Hey, your task list is loading!'
            : username
            ? `${username.toUpperCase()}'S TO-DO LIST`
            : 'YOUR TO-DO LIST'}
        </Logo>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};
