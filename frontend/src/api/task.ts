import axios, {AxiosRequestConfig} from 'axios';
import {Task} from '../types/task';

class TaskApi {
  constructor(private serverUri: string, private axiosConfig: AxiosRequestConfig = {}) {}

  async getTasks(): Promise<Task[]> {
    const response = await axios.get(`${this.serverUri}/tasks/getAllTasks`, {
      ...this.axiosConfig,
    });
    return response.data;
  }

  //async getTask(payload: {id: string}): Promise<Task> {
  //  const response = await axios.get(`${this.serverUri}/tasks/getTask`, {
  //    ...this.axiosConfig,
  //    data: payload,
  //  });
  //  return response.data;
  //}

  async createTask(payload: FormData): Promise<Task> {
    const response = await axios.post(`${this.serverUri}/tasks`, payload, {
      ...this.axiosConfig,
    });
    return response.data;
  }

  async updateTask(payload: FormData): Promise<{success: boolean}> {
    const response = await axios.post(`${this.serverUri}/tasks/updateTask`, payload, {
      ...this.axiosConfig,
    });
    return response.data;
  }

  async deleteTask(payload: {id: string}): Promise<{success: boolean}> {
    const response = await axios.post(
      `${this.serverUri}/tasks/deleteTask`,
      {
        ...payload,
      },
      {
        ...this.axiosConfig,
      },
    );
    return response.data;
  }
  async updateTaskPosition(payload: {id: string; newTaskPosition: number}): Promise<{success: boolean}> {
    const response = await axios.post(
      `${this.serverUri}/tasks/updateTasksPositions`,
      {
        ...payload,
      },
      {
        ...this.axiosConfig,
      },
    );
    return response.data;
  }
}

export default TaskApi;
