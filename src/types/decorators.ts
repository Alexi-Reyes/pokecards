import type { ComponentType, MouseEvent, ReactNode } from 'react';

export type CardFrameProps = {
  className: string;
  children: ReactNode;
  onMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLDivElement>) => void;
};

export type CardFrameComponent = ComponentType<CardFrameProps>;
