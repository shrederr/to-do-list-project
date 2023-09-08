import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Task, TaskField, TaskInValues, ErrorsInValues} from '../types/task';
import TaskApi from '../api/task';
import {validateTitle} from '../helpers/validations';
import {serverErrorHandler} from '../helpers/error';
import {SERVER_URI} from '../constants/env';
import {withToken} from '../libs/auth';
import {DropResult} from 'react-beautiful-dnd';
import {toFormData} from '../helpers/format';

const validateTaskInValues = (
  values: Partial<TaskInValues>,
  setError: Dispatch<SetStateAction<Partial<ErrorsInValues>>>,
): boolean => {
  const titleValid = validateTitle(values.title);
  if (!titleValid) setError((prev) => ({...prev, ['title']: 'Cant be empty'}));
  return titleValid;
};
type TasksInType = () => {
  performCRUDOperation: (operation: string, callback?: () => void, id?: string) => Promise<void>;
  onChange: (next: {name: keyof TaskInValues; value: string}) => void;
  changeImageFile: (file: File | null) => void;
  cleanState: () => void;
  onDragEnd: (result: DropResult) => void;
  loading: boolean;
  loadingCRUD: boolean;
  tasks: Task[] | null;
  errors: Partial<ErrorsInValues>;
  values: Partial<TaskInValues>;
};
export const useTasks: TasksInType = () => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [imageFile, setImage] = useState<File | null>(null);
  const taskApi = new TaskApi(SERVER_URI, withToken({headers: null}));
  const [errors, setError] = useState<Partial<ErrorsInValues>>({});
  const [values, setValues] = useState<Partial<TaskInValues>>({
    [TaskField.title]: '',
    [TaskField.content]: '',
    [TaskField.image]: '',
    [TaskField.id]: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCRUD, setCRUDLoading] = useState<boolean>(false);
  const changeValue = (next: {name: keyof TaskInValues; value: string}): void => {
    setError({});
    setValues((prev) => ({...prev, [next.name]: next.value}));
  };
  const changeImageFile = (file: File | null) => {
    setImage(file);
  };
  const cleanState = () => {
    setError({});
    setImage(null);
    setValues({[TaskField.title]: '', [TaskField.content]: '', [TaskField.image]: '', [TaskField.id]: ''});
  };
  const requestTasks = async () => {
    try {
      const response = await taskApi.getTasks();
      if (response) {
        setTasks(response);
      }
      setLoading(false);
    } catch (e) {
      alert(serverErrorHandler(e));
      setLoading(false);
    }
  };
  const reorderTask = (list: Task[], startIdx: number, endIdx: number): Task[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);
    taskApi.updateTaskPosition({id: removed.id, newTaskPosition: result.length - endIdx});
    return result as Task[];
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const tasksToUpdate = reorderTask(tasks, result.source.index, result.destination.index);

    setTasks(tasksToUpdate);
  };
  const performCRUDOperation = async (operation: string, callback?: () => void, id?: string) => {
    setCRUDLoading(true);
    try {
      let response: any;
      switch (operation) {
        case 'create':
          if (validateTaskInValues(values, setError)) {
            const formData = toFormData({...values, image: imageFile || ''}, [TaskField.id]);
            response = await taskApi.createTask(formData);
            if (response) {
              setTasks((prevState) => [...prevState, response]);
            }
          }
          break;
        case 'update':
          if (validateTaskInValues(values, setError)) {
            const formData = toFormData({...values, image: imageFile || values.image}, ['']);
            response = await taskApi.updateTask(formData);
          }
          break;
        case 'delete':
          response = await taskApi.deleteTask({id: id as string});
          break;
        case 'select':
          const selectedTask = tasks.find((taskObj) => taskObj.id == id);
          if (selectedTask) {
            setValues(selectedTask);
          }
          break;
        default:
          break;
      }
      setCRUDLoading(false);
      if (callback) {
        callback();
      }
    } catch (e) {
      alert(serverErrorHandler(e));
      setError((prev) => ({...prev, ['server']: serverErrorHandler(e)}));
      setCRUDLoading(false);
    }
  };
  useEffect(() => {
    requestTasks();
  }, [loadingCRUD]);
  return {
    performCRUDOperation,
    onChange: changeValue,
    cleanState,
    changeImageFile,
    onDragEnd,
    loading,
    loadingCRUD,
    tasks,
    errors,
    values,
  };
};
