export type Filtro = 'todas' | 'ativas' | 'concluidas';
export type Prioridade = 'alta' | 'media' | 'baixa';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  prioridade: Prioridade;
  categoria: string;
}