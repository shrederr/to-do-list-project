import React from 'react';
import {Header} from './header';
import {LayoutComponent} from '../../componets/Layout';
interface Props {
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}) => {
  return <LayoutComponent header={<Header />}>{children}</LayoutComponent>;
};
