import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

interface LabelTextProps extends PropsWithChildren {
  className?: string;
}

const LabelText: FC<LabelTextProps> = ({ className, children }) => (
  <span className={classNames('text-lg', className)}>{children}</span>
);

export default LabelText;
