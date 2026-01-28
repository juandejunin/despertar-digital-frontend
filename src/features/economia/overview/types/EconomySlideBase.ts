export type EconomySlideKind =
  | 'forex'
  | 'crypto'
  | 'placeholder';
// | 'country'
// | 'commodity';

export type EconomySlideBase = {
  id: string;
  kind: EconomySlideKind;
};
