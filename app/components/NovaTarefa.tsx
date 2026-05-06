'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Prioridade } from '../types/tasks';

interface Props {
  onAddTask: (title: string, prioridade: Prioridade, categoria: string) => void;
}

const NovaTarefa: React.FC<Props> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [prioridade, setPrioridade] = useState<Prioridade>('media');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), prioridade, categoria);
      setTitle('');
      setCategoria('');
      setPrioridade('media');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <LinhaInput>
        <Input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Digite uma nova tarefa..."
        />
        <Button type="submit">Adicionar</Button>
      </LinhaInput>
      <LinhaOpcoes>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
            Prioridade:
          </span>
          <GrupoPrioridade>
            {(['alta', 'media', 'baixa'] as Prioridade[]).map(p => (
              <BotaoPrioridade
                key={p}
                type="button"
                $prioridade={p}
                $ativo={prioridade === p}
                onClick={() => setPrioridade(p)}
              >
                {p === 'alta' ? '🔴 Alta' : p === 'media' ? '🟡 Média' : '🟢 Baixa'}
              </BotaoPrioridade>
            ))}
          </GrupoPrioridade>
        </div>
        <InputCategoria
          type="text"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          placeholder="Categoria (opcional)"
        />
      </LinhaOpcoes>
    </Form>
  );
};

export default NovaTarefa;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const LinhaInput = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LinhaOpcoes = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: #4f46e5;
  }
`;

const GrupoPrioridade = styled.div`
  display: flex;
  gap: 4px;
`;

const corPrioridade: Record<Prioridade, { bg: string; border: string; ativo: string }> = {
  alta: { bg: '#fee2e2', border: '#fca5a5', ativo: '#ef4444' },
  media: { bg: '#fef9c3', border: '#fde047', ativo: '#eab308' },
  baixa: { bg: '#dcfce7', border: '#86efac', ativo: '#22c55e' },
};

const BotaoPrioridade = styled.button<{ $prioridade: Prioridade; $ativo: boolean }>`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: ${({ $ativo }) => ($ativo ? '600' : '400')};
  color: ${({ $ativo }) => ($ativo ? '#fff' : '#374151')};

  border: 1px solid ${({ $prioridade, $ativo }) => {
    const p = $prioridade as Prioridade;
    return $ativo ? corPrioridade[p].ativo : corPrioridade[p].border;
  }};

  background: ${({ $prioridade, $ativo }) => {
    const p = $prioridade as Prioridade;
    return $ativo ? corPrioridade[p].ativo : corPrioridade[p].bg;
  }};
`;

const InputCategoria = styled.input`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
  }

  &::placeholder {
    color: #cbd5e1;
  }
`;