import clsx from 'clsx';
import type { AllHTMLAttributes, FC } from 'react';

const Container: FC<AllHTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
	<div {...props} className={clsx('flex flex-col', className)} />
);

export default Container;
