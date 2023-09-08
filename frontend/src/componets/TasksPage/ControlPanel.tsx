import React from 'react';
import {AddTaskButton, ControlPanelWrapper, LogOut} from './styles';
import {Icon} from '../Icon';
interface Props {
  toggleForm: () => void;
  logOut: () => void;
  isForm: boolean;
}
export const ControlPanel: React.FC<Props> = ({toggleForm, isForm, logOut}) => {
  return (
    (!isForm && (
      <ControlPanelWrapper>
        <AddTaskButton onClick={toggleForm}>
          <Icon type={'add'} />
          Add new task
        </AddTaskButton>
        <LogOut onClick={logOut}>
          <Icon type={'exit'} />
        </LogOut>
      </ControlPanelWrapper>
    )) ||
    null
  );
};
