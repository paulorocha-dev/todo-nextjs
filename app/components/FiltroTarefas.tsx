'use client';

import React from 'react';
import styled from 'styled-components';
import { Filtro } from '../types/tasks';

interface Props {
  filtroAtivo: Filtro;
  onFiltrar: (filtro: Filtro) => void;
  total: number;
  concluidas: number;
  onLimparConcluidas: () => void;
  categorias: string[];
  categoriaAtiva: string | null;
  onFiltrarCategoria: (categoria: string | null) => void;
}

const opcoes: { label: string; value: Filtro }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Ativas', value: 'ativas' },
  { label: 'Concluídas', value: 'concluidas' },
];

const FiltroTarefas: React.FC<Props> = ({
  filtroAtivo, onFiltrar, total, concluidas,
  onLimparConcluidas, categorias, categoriaAtiva, onFiltrarCategoria,
}) => {
  return (
    <Wrapper>
      <Linha>
        <Stats>{concluidas} de {total} concluídas</Stats>
        <Botoes>
          {opcoes.map(({ label, value }) => (
            <BotaoFiltro
              key={value}
              $ativo={filtroAtivo === value}
              onClick={() => onFiltrar(value)}
            >
              {label}
            </BotaoFiltro>
          ))}
        </Botoes>
      </Linha>

      {categorias.length > 0 && (
        <LinhaCategoria>
          <TagCategoria
            $ativo={categoriaAtiva === null}
            onClick={() => onFiltrarCategoria(null)}
          >
            Todas
          </TagCategoria>
          {categorias.map(cat => (
            <TagCategoria
              key={cat}
              $ativo={categoriaAtiva === cat}
              onClick={() => onFiltrarCategoria(cat)}
            >
              {cat}
            </TagCategoria>
          ))}
        </LinhaCategoria>
      )}

      {concluidas > 0 && (
        <BotaoLimpar onClick={onLimparConcluidas}>
          Limpar concluídas ({concluidas})
        </BotaoLimpar>
      )}
    </Wrapper>
  );
};

export default FiltroTarefas;

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Linha = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const Stats = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const Botoes = styled.div`
  display: flex;
  gap: 4px;

  @media (max-width: 480px) {
    width: 100%;
    button { flex: 1; text-align: center; }
  }
`;

const BotaoFiltro = styled.button<{ $ativo: boolean }>`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid ${({ $ativo }) => ($ativo ? '#6366f1' : '#e2e8f0')};
  background: ${({ $ativo }) => ($ativo ? '#6366f1' : 'transparent')};
  color: ${({ $ativo }) => ($ativo ? '#fff' : '#64748b')};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
    color: ${({ $ativo }) => ($ativo ? '#fff' : '#6366f1')};
  }
`;

const LinhaCategoria = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TagCategoria = styled.button<{ $ativo: boolean }>`
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $ativo }) => ($ativo ? '#6366f1' : '#e2e8f0')};
  background: ${({ $ativo }) => ($ativo ? '#ede9fe' : 'transparent')};
  color: ${({ $ativo }) => ($ativo ? '#6366f1' : '#94a3b8')};
  font-weight: ${({ $ativo }) => ($ativo ? '600' : '400')};
`;

const BotaoLimpar = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #94a3b8;
  cursor: pointer;
  padding: 2px 4px;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;