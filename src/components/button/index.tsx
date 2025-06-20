import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';
import clsx from 'clsx';
import { Sparkles } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx('btn btn-primary flex gap-2', className)}
      {...props}
    >
      <Sparkles />
      {children}
    </button>
  );
};
