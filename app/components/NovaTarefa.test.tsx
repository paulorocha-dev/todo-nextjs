import { render, screen, fireEvent } from '@testing-library/react';
import NovaTarefa from '../components/NovaTarefa';

test('Deve adicionar uma nova tarefa', () => {
  const mockOnAddTask = jest.fn();
  render(<NovaTarefa onAddTask={mockOnAddTask} />);

  const input = screen.getByPlaceholderText('Nova Tarefa') as HTMLInputElement;
  const button = screen.getByText('Adicionar');

  fireEvent.change(input, { target: { value: 'Nova tarefa de teste' } });
  fireEvent.click(button);

  expect(mockOnAddTask).toHaveBeenCalledWith('Nova tarefa de teste');
  expect(input.value).toBe('');
});
