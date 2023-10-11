import { SxProps, Breakpoint } from '@mui/material';

import { GatewayTheme } from './theme';

export interface ExtraPalette {}

export interface ExtraPaletteOptions {
  elevated?: string;
}

export interface ExtraTypeBackground {
  light?: string;
  elevated?: string;
}

export interface ExtraTheme {}

export type BreakpointsValue<T> = Partial<Record<Breakpoint, T>>;
export type GatewaySxProps = SxProps<GatewayTheme>;
