import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'success'
  | 'error';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  outline?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  icon,
  variant = 'primary',
  outline = false,
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'btn',
        'btn-md',
        {
          'btn-neutral': variant === 'neutral',
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-accent': variant === 'accent',
          'btn-ghost': variant === 'ghost',
          'btn-link': variant === 'link',
          'btn-outline': outline,
          'btn-success': variant === 'success',
          'btn-error': variant === 'error',
          'w-full': fullWidth,
        },
        'flex',
        'gap-2',
        'focus:ring-2',
        'focus:ring-blue-500',
        'focus:ring-offset-2',
        'focus:outline-none',
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
