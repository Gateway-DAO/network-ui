import { act, renderHook } from '@testing-library/react';

import { useMenu } from '../use-menu';

describe('Hook: useMenu', () => {
  it('should set element to null initially', () => {
    const { result } = renderHook(() => useMenu());

    expect(result.current.element).toBeNull();
  });

  it('should set element to the current target on open', () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.onOpen({ currentTarget: document.createElement('div') });
    });

    expect(result.current.element).toBeDefined();
  });

  it('should set element to null on close', () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.onOpen({ currentTarget: document.createElement('div') });
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.element).toBeNull();
  });

  it('should return isOpen as false when element is null', () => {
    const { result } = renderHook(() => useMenu());

    expect(result.current.isOpen).toBe(false);
  });

  it('should return isOpen as true when element is set', () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.onOpen({ currentTarget: document.createElement('div') });
    });

    expect(result.current.isOpen).toBe(true);
  });
});
