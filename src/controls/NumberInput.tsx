import { AllHTMLAttributes, FC, useEffect, useState } from "react";
import classNames from "classnames";
import { inputStyle } from "../styles/inputStyles";

export interface NumberInputProps extends Omit<AllHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
	number: number | undefined;
	onChangeNumber: (number: number | undefined) => void;
}

const NumberInput: FC<NumberInputProps> = ({ number, onChangeNumber, className, ...props }) => {
	const [text, setText] = useState<string>("");

	const handelTextChange = (text: string) => {
		if (text.length === 0) {
			setText("");
			onChangeNumber(undefined);
			return;
		}
		const regex = new RegExp(/^[0-9]+\.?[0-9]*$/);
		const result = text.match(regex);
		if (result === null) return;
		const number = parseFloat(text);
		if (!Number.isNaN(number)) onChangeNumber(number);
		setText(text);
	};

	useEffect(() => {
		if ((text.length === 0 && number !== undefined) || (text.length !== 0 && parseFloat(text) !== number))
			setText(number?.toString() ?? "");
	}, [text, number]);

	return (
		<input
			{...props}
			value={text}
			onChange={(event) => handelTextChange(event.target.value)}
			type={"number"}
			className={classNames(inputStyle, className)}
		/>
	);
};

export default NumberInput;
