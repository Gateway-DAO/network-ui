import { renderHook } from '@testing-library/react';

import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/system/useTheme';

import useBreakpoints from '../use-breakpoints';

jest.mock('@mui/system/useTheme', () => jest.fn());

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('useBreakpoints', () => {
  beforeAll(() => {
    (useTheme as jest.Mock).mockReturnValue({
      breakpoints: {
        down: jest.fn(),
        between: jest.fn(),
        up: jest.fn(),
      },
    });
  });

  it('should return the correct values for isMobile, isTablet, and isDesktop', () => {
    (useMediaQuery as jest.Mock)
      .mockReturnValueOnce(true) // mobile media query
      .mockReturnValueOnce(false) // tablet media query
      .mockReturnValueOnce(true); // desktop media query

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });
});
