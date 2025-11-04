import { render, screen } from '@testing-library/react';
import Page from '../app/page';

test('Deve renderizar a lista de tarefas', async () => {
  render(<Page />);
  expect(await screen.findByText('Tarefa 1')).toBeInTheDocument();
});
