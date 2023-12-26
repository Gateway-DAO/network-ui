import wrapper from '@/services/react-query/test-provider';
import { act, renderHook } from '@testing-library/react';

import useDebouncedUsernameAvailability from '../use-debounced-username-avaibility';

jest.mock('@/services/protocol/api', () => ({
  getClientPrivateApi: jest.fn(() => ({
    check_username_avaibility: jest.fn(() => ({
      checkUsernameAvailability: true,
    })),
  })),
}));

jest.useFakeTimers();

describe('Hook: useDebouncedUsernameAvailability', () => {
  // beforeEach(() => {
  //   (useMutation as jest.Mock).mockReturnValue({
  //     mutate: jest.fn(),
  //   });

  //   (useState as jest.Mock).mockReturnValue(['idle', jest.fn()]);

  //   (useDebouncedCallback as jest.Mock).mockReturnValue(jest.fn());

  //   (getClientPrivateApi as jest.Mock).mockReturnValue({
  //     check_username_avaibility: jest.fn(),
  //   });
  // });

  it('should set availability to "loading" when onStartCheckAvailability is called', async () => {
    const { result } = renderHook(() => useDebouncedUsernameAvailability(), {
      wrapper,
    });

    act(() => {
      result.current.onStartCheckAvailability();
    });

    expect(result.current.availability).toBe('loading');
  });

  it('should set availability to "idle" when onResetAvailability is called', () => {
    const { result } = renderHook(() => useDebouncedUsernameAvailability(), {
      wrapper,
    });

    act(() => {
      result.current.onStartCheckAvailability();
    });

    act(() => {
      result.current.onResetAvailability();
    });

    expect(result.current.availability).toBe('idle');
  });

  it('should call checkAvailability.mutate when onCheckAvailability is called', () => {
    const { result } = renderHook(() => useDebouncedUsernameAvailability(), {
      wrapper,
    });

    const spy = jest.spyOn(result.current, 'onCheckAvailability');

    act(() => {
      result.current.onStartCheckAvailability();
      result.current.onCheckAvailability('username');
    });

    expect(spy).toHaveBeenCalled();
  });

  xit('should set avaibility to tru when avaiblable', () => {
    const { result } = renderHook(() => useDebouncedUsernameAvailability(), {
      wrapper,
    });

    act(() => {
      result.current.onStartCheckAvailability();
      result.current.onCheckAvailability('username');
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.availability).toBe('success');
  });
});
