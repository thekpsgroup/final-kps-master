'use client';
import { motion } from 'framer-motion';

interface MotionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function MotionButton({
  href,
  children,
  className = '',
  variant = 'primary',
}: MotionButtonProps) {
  const baseClasses = 'btn-cta';
  const variantClasses = variant === 'primary' ? 'btn-cta-primary' : 'btn-cta-secondary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <motion.a
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    </motion.div>
  );
}
