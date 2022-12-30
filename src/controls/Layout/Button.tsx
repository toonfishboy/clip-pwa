import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
	<button
		{...props}
		className={classNames(
			"shadow-md rounded-md py-2 px-3 bg-gradient-to-tr from-rose-500 to-rose-700 text-white text-lg",
			className,
		)}
	>
		{children}
	</button>
);

export default Button;
