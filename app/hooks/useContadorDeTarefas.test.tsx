import { renderHook, act } from '@testing-library/react'; 
import useContadorDeTarefas from '../hooks/useContadorDeTarefas';

test('Deve contar tarefas', () => {
  const { result } = renderHook(() => useContadorDeTarefas(['Tarefa 1']));
  
  expect(result.current.count).toBe(1);
  
  act(() => {
    result.current.addTask('Tarefa 2');
  });
  
  expect(result.current.count).toBe(2);
});
