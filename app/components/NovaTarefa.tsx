'use client';

import React, { useState } from 'react';

interface NovaTarefaProps {
  onAddTask: (task: string) => void;
}

const NovaTarefa: React.FC<NovaTarefaProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Nova Tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default NovaTarefa;
