import React from 'react';
import {Wrapper, LoadingImg} from './styles';
import LoadingGif from '../../images/loading.gif';

export const Loading: React.FC = () => {
  return (
    <Wrapper>
      <LoadingImg src={LoadingGif} />
    </Wrapper>
  );
};
