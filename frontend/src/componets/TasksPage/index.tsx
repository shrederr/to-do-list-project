import React, {useState} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import type {Task as TaskType} from '../../types/task';
import {Overlay, TasksWrapper, Wrapper} from './styles';
import {ControlPanel} from './ControlPanel';
import {TaskForm} from './TaskForm';
import {ErrorsInValues, TaskInValues} from '../../types/task';
import {Loading} from '../Loading';
import {Modal} from '../Modal';
import {StrictModeDroppable, TasksList} from './TasksList';

interface ModalState {
  status: boolean;
  callback: (() => void) | null;
}

interface Props {
  tasks: TaskType[] | null;
  onDragEnd: (result: DropResult) => void;
  performCRUDOperation: (operation: string, callback?: () => void, id?: string) => Promise<void>;
  changeImageFile: (file: File | null) => void;
  onChange: (next: {name: keyof TaskInValues; value: string}) => void;
  cleanState: () => void;
  values: Partial<TaskInValues>;
  loading: boolean;
  loadingCRUD: boolean;
  errors: Partial<ErrorsInValues>;
  signOut: () => void;
}
export const TaskPage: React.FC<Props> = ({
  tasks,
  onDragEnd,
  performCRUDOperation,
  values,
  changeImageFile,
  cleanState,
  onChange,
  loading,
  loadingCRUD,
  signOut,
}) => {
  const [isForm, setIsForm] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({
    status: false,
    callback: null,
  });
  // Функции внутри компонента
  const toggleForm = () => {
    cleanState();
    setIsForm(!isForm);
  };
  const toggleModal = (callback: null | (() => void)) => {
    setModal({status: !modal.status, callback});
  };
  const selectTaskHandler = (id: string) => {
    toggleForm();
    performCRUDOperation('select', undefined, id);
  };
  const handlerCreate = () => {
    performCRUDOperation('create', toggleForm);
  };
  const handlerUpdate = () => {
    performCRUDOperation('update', toggleForm);
  };
  //need to refactory
  const deleteTaskHandler = (id: string) => {
    const callback = () => {
      performCRUDOperation('delete', undefined, id);
    };
    toggleModal(callback);
  };
  return (
    <Wrapper>
      <Modal callback={modal.callback} isModal={modal.status} closeModal={toggleModal} />;
      {(isForm || modal.status) && <Overlay />}
      {(loading || loadingCRUD) && <Loading />}
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks && (
          <StrictModeDroppable droppableId="list">
            {(provided) => (
              <TasksWrapper ref={provided.innerRef} {...provided.droppableProps}>
                <TasksList tasks={tasks} handlerSelect={selectTaskHandler} deleteSelect={deleteTaskHandler} />
                {provided.placeholder}
              </TasksWrapper>
            )}
          </StrictModeDroppable>
        )}
      </DragDropContext>
      <ControlPanel toggleForm={toggleForm} isForm={isForm} logOut={signOut} />
      <TaskForm
        isForm={isForm}
        toggleForm={toggleForm}
        createTask={handlerCreate}
        updateTask={handlerUpdate}
        onChange={onChange}
        changeImageFile={changeImageFile}
        values={values}
      />
    </Wrapper>
  );
};
