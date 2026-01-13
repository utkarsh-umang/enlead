import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  delay?: number;
  className?: string;
}

export function AnimatedCounter({ value, delay = 0, className = '' }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay,
      ease: 'easeOut',
    });

    return controls.stop;
  }, [count, value, delay]);

  return (
    <motion.span className={className}>
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
}
