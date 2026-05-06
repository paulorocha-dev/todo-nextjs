'use client';

import { useState, useEffect } from 'react';
import { Task, Filtro, Prioridade } from '../types/tasks';

const useTarefas = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('tarefas');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, prioridade: Prioridade, categoria: string) => {
    const nova: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      prioridade,
      categoria: categoria.trim(),
    };
    setTasks(prev => [nova, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const limparConcluidas = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  const categorias = Array.from(
    new Set(tasks.map(t => t.categoria).filter(Boolean))
  );

  const tarefasFiltradas = tasks.filter(t => {
    const passaFiltro =
      filtro === 'todas' ||
      (filtro === 'ativas' && !t.completed) ||
      (filtro === 'concluidas' && t.completed);

    const passaCategoria =
      !categoriaAtiva || t.categoria === categoriaAtiva;

    return passaFiltro && passaCategoria;
  });

  return {
    tasks: tarefasFiltradas,
    total: tasks.length,
    concluidas: tasks.filter(t => t.completed).length,
    filtro,
    setFiltro,
    categorias,
    categoriaAtiva,
    setCategoriaAtiva,
    addTask,
    toggleTask,
    deleteTask,
    limparConcluidas,
  };
};

export default useTarefas;