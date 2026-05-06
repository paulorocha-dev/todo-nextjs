'use client';

import React from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import NovaTarefa from './components/NovaTarefa';
import ItemTarefa from './components/ItemTarefa';
import FiltroTarefas from './components/FiltroTarefas';
import ProgressBar from './components/ProgressBar';
import useTarefas from './hooks/useTarefas';

const Page: React.FC = () => {
  const {
    tasks, total, concluidas, filtro, setFiltro,
    categorias, categoriaAtiva, setCategoriaAtiva,
    addTask, toggleTask, deleteTask, limparConcluidas,
  } = useTarefas();

  return (
    <Container>
      <Card>
        <Title>📝 Minhas Tarefas</Title>
        <NovaTarefa onAddTask={addTask} />
        {total > 0 && <ProgressBar total={total} concluidas={concluidas} />}
        <FiltroTarefas
          filtroAtivo={filtro}
          onFiltrar={setFiltro}
          total={total}
          concluidas={concluidas}
          onLimparConcluidas={limparConcluidas}
          categorias={categorias}
          categoriaAtiva={categoriaAtiva}
          onFiltrarCategoria={setCategoriaAtiva}
        />
        {tasks.length === 0 ? (
          <EmptyState>
            {total === 0
              ? 'Nenhuma tarefa ainda. Adicione uma! 🚀'
              : 'Nenhuma tarefa nessa categoria.'}
          </EmptyState>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <AnimatePresence>
              {tasks.map(task => (
                <ItemTarefa
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </Card>
    </Container>
  );
};

export default Page;

const Container = styled.main`
  min-height: 100vh;
  background: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 16px;

  @media (max-width: 480px) {
    padding: 0;
    align-items: stretch;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  @media (max-width: 480px) {
    border-radius: 0;
    padding: 24px 16px;
    box-shadow: none;
    min-height: 100vh;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #94a3b8;
  padding: 32px 0;
  font-size: 0.95rem;
`;