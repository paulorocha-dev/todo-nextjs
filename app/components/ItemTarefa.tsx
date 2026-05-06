'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Task, Prioridade } from '../types/tasks';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItemTarefa: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Item>
        <Checkbox
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <Conteudo>
          <TituloLinha>
            <Title $completed={task.completed}>{task.title}</Title>
            <BadgePrioridade $prioridade={task.prioridade}>
              {task.prioridade === 'alta' ? '🔴' : task.prioridade === 'media' ? '🟡' : '🟢'}
            </BadgePrioridade>
          </TituloLinha>
          {task.categoria && (
            <Tag>{task.categoria}</Tag>
          )}
        </Conteudo>
        <DeleteButton onClick={() => onDelete(task.id)} aria-label="Remover tarefa">
          ✕
        </DeleteButton>
      </Item>
    </motion.li>
  );
};

export default ItemTarefa;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
  flex-shrink: 0;
`;

const Conteudo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TituloLinha = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.span<{ $completed: boolean }>`
  font-size: 1rem;
  color: ${({ $completed }) => ($completed ? '#94a3b8' : '#1e293b')};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  transition: all 0.3s;
`;

const BadgePrioridade = styled.span<{ $prioridade: Prioridade }>`
  font-size: 0.75rem;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  background: #ede9fe;
  color: #6366f1;
  border-radius: 99px;
  padding: 1px 8px;
  width: fit-content;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px 6px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  flex-shrink: 0;

  &:hover {
    color: #ef4444;
    background: #fee2e2;
  }
`;