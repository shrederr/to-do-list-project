import React from 'react';
import {Wrapper, ButtonsWrapper, ConditionButton, ModalText} from './styles';

interface Props {
  callback: (() => void) | null;
  isModal: boolean;
  closeModal: (callback: (() => void) | null) => void;
}

export const Modal: React.FC<Props> = ({closeModal, isModal, callback}) => {
  const closeModalHandler = (condition: boolean) => () => {
    condition && callback && callback();
    closeModal(null);
  };
  return (
    <Wrapper theme={{open: isModal}}>
      <ModalText>Are you sure?</ModalText>
      <ButtonsWrapper>
        <ConditionButton onClick={closeModalHandler(true)}>Yes</ConditionButton>
        <ConditionButton onClick={closeModalHandler(false)}>No</ConditionButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};
