import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  ariaLabel: string;
  onHoverSpeak?: string;
}

export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  ariaLabel,
  onHoverSpeak,
  className = '',
  ...props
}: AccessibleButtonProps) {
  const { speak, screenReader } = useAccessibility();

  const handleMouseEnter = () => {
    if (screenReader && onHoverSpeak) {
      speak(onHoverSpeak);
    }
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50',
    secondary: 'border-2 border-blue-400/40 hover:border-blue-400 bg-blue-500/5 hover:bg-blue-500/10 text-white',
    ghost: 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all focus:outline-none focus:ring-4 focus:ring-blue-400/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
