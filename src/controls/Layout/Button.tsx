import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
	<button {...props} className={classNames("button-primary", className)}>
		{children}
	</button>
);

export default Button;
