import type { FC } from 'react';
import clsx from 'clsx';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  type LucideIcon,
} from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const icons: Record<Required<AlertProps>['type'], LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
};

export const Alert: FC<AlertProps> = ({
  children,
  className,
  title,
  type = 'info',
}) => {
  const Icon = icons[type];

  return (
    <div
      role="alert"
      className={clsx(
        'alert',
        'alert-outline',
        {
          'alert-info': type === 'info',
          'alert-success': type === 'success',
          'alert-warning': type === 'warning',
          'alert-error': type === 'error',
        },
        className
      )}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <div>
        {title && <p className="font-bold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
};
