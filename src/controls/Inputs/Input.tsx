import classNames from "classnames";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface InputProps
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	isClearable?: boolean;
}

const Input: FC<InputProps> = ({ value, className, ...props }) => {
	return (
		<input {...props} value={value ?? ""} className={classNames("input-primary", className)} />
	);
};

export default Input;
