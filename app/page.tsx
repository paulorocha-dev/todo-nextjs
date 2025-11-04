'use client';

import React, { useEffect } from 'react';
import NovaTarefa from './components/NovaTarefa';
import useContadorDeTarefas from './hooks/useContadorDeTarefas';

const fetchTasks = async () => {
  return Promise.resolve(['Tarefa 1', 'Tarefa 2']);
};

const Page: React.FC = () => {
  const { tasks, count, addTask } = useContadorDeTarefas();

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      tasksFromServer.forEach(addTask);
    };
    getTasks();
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <p>Total de Tarefas: {count}</p>
      <NovaTarefa onAddTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
