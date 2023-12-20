import { renderHook, act } from '@testing-library/react';

import { useCountdown } from '../use-countdown';

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should start counting down when trigger is true', () => {
    const { result } = renderHook(() =>
      useCountdown({ time: 30, interval: 1, trigger: true })
    );

    expect(result.current.counting).toBeTruthy();
    expect(result.current.time).toBe(30);

    act(() => {
      jest.advanceTimersByTime(1000); // Advance 1 second
    });

    expect(result.current.time).toBe(29);

    act(() => {
      jest.advanceTimersByTime(29000); // Advance 29 seconds
    });

    expect(result.current.time).toBe(30);
    expect(result.current.counting).toBe(false);
  });

  test('should not start counting down when is disabled', () => {
    const { result } = renderHook(() =>
      useCountdown({ time: 30, interval: 1, trigger: true, disabled: true })
    );

    expect(result.current.counting).toBe(false);
    expect(result.current.time).toBe(30);

    act(() => {
      jest.advanceTimersByTime(1000); // Advance 1 second
    });

    expect(result.current.time).toBe(30);
  });

  test('should reset countdown when trigger is triggered', () => {
    const { result, rerender } = renderHook(
      ({ trigger }) => useCountdown({ time: 30, interval: 1, trigger }),
      {
        initialProps: { trigger: true },
      }
    );

    expect(result.current.counting).toBe(true);
    expect(result.current.time).toBe(30);

    act(() => {
      jest.advanceTimersByTime(1000); // Advance 1 second
    });

    expect(result.current.time).toBe(29);

    rerender({ trigger: false });

    expect(result.current.time).toBe(30);
    expect(result.current.counting).toBe(true);
  });
});
