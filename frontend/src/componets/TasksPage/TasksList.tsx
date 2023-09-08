import {Draggable, Droppable, DroppableProps} from 'react-beautiful-dnd';
import React, {useEffect, useMemo, useState} from 'react';
import {Task as TaskType} from '../../types/task';
import {DefaultIconButton, TaskContentWrapper, TaskDoWrapper, TaskImage, TaskWrapper} from './styles';
import {Icon} from '../Icon';

export const StrictModeDroppable = ({children, ...props}: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
function Task({
  task,
  index,
  handlerSelect,
  deleteSelect,
}: {
  task: TaskType;
  index: number;
  handlerSelect: (id: string) => void;
  deleteSelect: (id: string) => void;
}) {
  const openUpdateForm = (id: string) => () => {
    handlerSelect(id);
  };
  const deleteTask = (id: string) => () => {
    deleteSelect(id);
  };
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <TaskWrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <TaskImage src={task.image} />
          <TaskContentWrapper>
            <p>{task.title}</p>
            <p>{task.content}</p>
          </TaskContentWrapper>
          <TaskDoWrapper>
            <DefaultIconButton onClick={openUpdateForm(task.id)}>
              <Icon type={'edit'} />
            </DefaultIconButton>
            <DefaultIconButton onClick={deleteTask(task.id)}>
              <Icon type={'delete'} />
            </DefaultIconButton>
          </TaskDoWrapper>
        </TaskWrapper>
      )}
    </Draggable>
  );
}
export const TasksList = React.memo(function QuoteList({
  tasks,
  handlerSelect,
  deleteSelect,
}: {
  tasks: TaskType[];
  handlerSelect: (id: string) => void;
  deleteSelect: (id: string) => void;
}) {
  const tasksElements = useMemo(() => {
    return tasks.map((task: TaskType, index: number) => (
      <Task task={task} index={index} key={task.id} handlerSelect={handlerSelect} deleteSelect={deleteSelect} />
    ));
  }, [tasks]);

  return <>{tasksElements}</>;
});
