import clsx from 'clsx';
import type { AllHTMLAttributes, FC, PropsWithChildren } from 'react';
import LabelText from './LabelText';

export type LabelWrapperProps = AllHTMLAttributes<HTMLLabelElement> &
	PropsWithChildren & {
		label?: string;
		header?: JSX.Element;
	};
const LabelWrapper: FC<LabelWrapperProps> = ({ header, label, className, children, ...props }) => (
	<label {...props} className={clsx('flex flex-col', className)}>
		{header ? header : <LabelText>{label}</LabelText>}
		{children}
	</label>
);

export default LabelWrapper;
