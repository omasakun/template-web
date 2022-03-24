import { useCallback, useState } from 'react'

export const useCounter = () => {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount((x) => x + 1), [])
  return { count, increment }
}

// in-source test suites
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest
  const { act, renderHook } = await import('@testing-library/react-hooks')

  describe('useCounter', () => {
    test('should increment counter', () => {
      const { result } = renderHook(() => useCounter())
      act(() => {
        result.current.increment()
      })
      expect(result.current.count).toBe(1)
    })
  })
}
