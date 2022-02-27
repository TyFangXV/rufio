import { Transition, GroupedTransition } from '@mantine/core';

type TransitionProps = {
  children: React.ReactNode;
  [key: string]: any;
};

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0.5, transform: 'scaleY(0.5)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

const AnimationContainer: React.FC<TransitionProps> = ({
  children,
  ...props
}) => {
  return (
    <Transition
      {...props}
      mounted={true}
      transition={scaleY}
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>{children}</div>}
    </Transition>
  );
};

export default AnimationContainer;
