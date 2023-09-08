import React from 'react';
import {LayoutWrapper, Main} from './styles';

type LayoutProps = {
  header: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const LayoutComponent: React.FC<LayoutProps> = ({children, header}) => {
  return (
    <LayoutWrapper>
      {header}
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};
