import { renderHook, act } from '@testing-library/react-hooks';
import { useComputed } from '../hooks/useComputed';

test('should return a hello words', () => {
  const { result } = renderHook(() => useComputed('Alan'));
  act(() => {
    result.current.changeValue()
  })
  expect(result.current.value).toBe('use changeValue');
});
