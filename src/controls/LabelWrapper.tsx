import { AllHTMLAttributes, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import LabelText from './LabelText';

export type LabelWrapperProps = AllHTMLAttributes<HTMLLabelElement> &
  PropsWithChildren & {
    label?: string;
    header?: JSX.Element;
  };
const LabelWrapper: FC<LabelWrapperProps> = ({ header, label, className, children, ...props }) => (
  <label {...props} className={classNames('flex flex-col', className)}>
    {header ? header : <LabelText>{label}</LabelText>}
    {children}
  </label>
);

export default LabelWrapper;
