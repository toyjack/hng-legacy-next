import { CardContainerProps } from '@/types/components';
import { cn } from '@/lib/utils';

function CardContainer({ 
  title, 
  children, 
  variant = 'default',
  size = 'md',
  className 
}: CardContainerProps) {
  const baseClasses = 'shadow-md p-4 mb-4 rounded-lg';
  
  const variants = {
    default: 'bg-base-200',
    outlined: 'bg-base-100 border border-base-300',
    filled: 'bg-base-300',
  };

  const sizes = {
    sm: 'p-2 mb-2',
    md: 'p-4 mb-4',
    lg: 'p-6 mb-6',
  };

  const titleSizes = {
    sm: 'text-lg py-1 md:py-2',
    md: 'text-2xl py-2 md:py-4',
    lg: 'text-3xl py-3 md:py-5',
  };

  const containerClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <div className={containerClasses}>
      <h4 className={cn('font-bold', titleSizes[size])}>
        {title}
      </h4>
      <div className="flex overflow-x-auto md:flex-wrap gap-2 md:gap-4">
        {children}
      </div>
    </div>
  );
}

export default CardContainer;
