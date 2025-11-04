import { useState } from 'react';

const useContadorDeTarefas = (initialTasks: string[] = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task: string) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return {
    tasks,
    count: tasks.length,
    addTask,
  };
};

export default useContadorDeTarefas;
