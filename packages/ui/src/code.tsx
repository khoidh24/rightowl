import { type JSX } from 'react';
import { cn } from '@repo/lib/utils';

export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <code
      className={cn(
        'bg-black/2 px-2 rounded-lg border-gray-200 border font-medium',
        className
      )}
    >
      {children}
    </code>
  );
}
