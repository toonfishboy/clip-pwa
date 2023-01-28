import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

interface HelperTextProps extends PropsWithChildren {
  type: 'error' | 'warning' | 'info';
  className?: string;
}

const HelperText: FC<HelperTextProps> = ({ children, type, className }) => {
  const getColor = () => {
    switch (type) {
      case 'error':
        return 'text-rose-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-black';
    }
  };

  return <span className={classNames(getColor(), className)}>{children}</span>;
};

export default HelperText;
