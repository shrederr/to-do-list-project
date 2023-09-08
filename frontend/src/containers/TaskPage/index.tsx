import React from 'react';
import {TaskPage} from '../../componets/TasksPage';
import {useTasks} from '../../hooks/tasks';
import {Loading} from '../../componets/Loading';
import {useSignOut} from '../../hooks/auth';

export const TaskPageContainer: React.FC = () => {
  const params = useTasks();
  const {signOut} = useSignOut();
  if (!params.tasks) return <Loading />;
  return <TaskPage {...params} signOut={signOut} />;
};
