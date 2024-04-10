import clsx from 'clsx';
import type { AllHTMLAttributes, FC, PropsWithChildren } from 'react';

interface LabelTextProps extends AllHTMLAttributes<HTMLSpanElement>, PropsWithChildren {
	className?: string;
}

const LabelText: FC<LabelTextProps> = ({ className, children, ...props }) => (
	<div {...props} className={clsx('text-lg', className)}>
		{children}
	</div>
);

export default LabelText;
