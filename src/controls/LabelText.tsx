import { AllHTMLAttributes, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

interface LabelTextProps extends AllHTMLAttributes<HTMLSpanElement>, PropsWithChildren {
  className?: string;
}

const LabelText: FC<LabelTextProps> = ({ className, children, ...props }) => (
  <div {...props} className={classNames('text-lg', className)}>
    {children}
  </div>
);

export default LabelText;
