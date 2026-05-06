'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  total: number;
  concluidas: number;
}

const ProgressBar: React.FC<Props> = ({ total, concluidas }) => {
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  return (
    <Wrapper>
      <Trilha>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${porcentagem}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: porcentagem === 100 ? '#22c55e' : '#6366f1',
            borderRadius: 99,
          }}
        />
      </Trilha>
      <Percentual $completo={porcentagem === 100}>
        {porcentagem === 100 ? '🎉 Tudo concluído!' : `${porcentagem}%`}
      </Percentual>
    </Wrapper>
  );
};

export default ProgressBar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Trilha = styled.div`
  flex: 1;
  height: 6px;
  background: #e2e8f0;
  border-radius: 99px;
  overflow: hidden;
`;

const Percentual = styled.span<{ $completo: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ $completo }) => ($completo ? '#22c55e' : '#6366f1')};
  min-width: 90px;
  text-align: right;
`;