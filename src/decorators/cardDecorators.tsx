import type { CardFrameComponent, CardFrameProps } from '@/types';
import styles from '@/app/components/Card/card.module.css';

const appendClassName = (className: string, extraClassName: string) => {
  return [className, extraClassName].filter(Boolean).join(' ');
};

export const withLocked = (Component: CardFrameComponent): CardFrameComponent => {
  const Wrapped = (props: CardFrameProps) => (
    <Component {...props} className={appendClassName(props.className, styles.locked)} />
  );

  Wrapped.displayName = 'withLocked';
  return Wrapped;
};

export const withShiny = (Component: CardFrameComponent): CardFrameComponent => {
  const Wrapped = (props: CardFrameProps) => (
    <Component {...props} className={appendClassName(props.className, styles.shiny)} />
  );

  Wrapped.displayName = 'withShiny';
  return Wrapped;
};
