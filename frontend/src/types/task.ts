import {AuthField} from './auth';

export interface Task {
  id: string;
  title: string;
  position: number;
  content: string;
  image: string;
}

export interface CreateTaskRequest {
  title: string;
  content: string;
}

export interface DeleteTaskRequest {
  id: string;
}

export enum TaskField {
  title = 'title',
  content = 'content',
  image = 'image',
  id = 'id',
}

export interface TaskInValues {
  [TaskField.image]: string;
  [TaskField.title]: string;
  [TaskField.content]: string;
  [TaskField.id]: string;
}

export interface ErrorsInValues extends TaskInValues {
  [AuthField.server]: string;
}
