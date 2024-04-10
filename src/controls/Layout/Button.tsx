import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC } from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
	<button
		{...props}
		className={clsx(
			'rounded-md bg-gradient-to-tr from-rose-500 to-rose-700 py-2 px-3 text-lg text-white shadow-md',
			className,
		)}
	>
		{children}
	</button>
);

export default Button;
