import { LoadingSpinnerProps } from '@/types/components';
import { cn } from '@/lib/utils';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'spinner', 
  className 
}: LoadingSpinnerProps) => {
  const baseClasses = 'loading';
  
  const sizes = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  const variants = {
    spinner: 'loading-spinner',
    dots: 'loading-dots',
    ring: 'loading-ring',
  };

  const spinnerClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <div className="flex justify-center items-center p-4">
      <span className={spinnerClasses}></span>
    </div>
  );
};

export default LoadingSpinner;