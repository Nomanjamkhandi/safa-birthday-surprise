export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface GiftItem {
  id: number;
  title: string;
  ribbonColor: string;
  boxColor: string;
  message: string;
  opened: boolean;
  emoji: string;
}

export type LetterId = 'jung-kook' | 'noman';
