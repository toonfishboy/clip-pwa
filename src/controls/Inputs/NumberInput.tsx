import { AllHTMLAttributes, FC, useEffect, useState } from "react";
import Input from "./Input";

export interface NumberInputProps
	extends Omit<AllHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
	number: number | undefined;
	onNumberChange?: (number: number | undefined) => void;
}

const NumberInput: FC<NumberInputProps> = ({ number, onNumberChange, ...props }) => {
	const [text, setText] = useState<string>("");

	const handelTextChange = (text: string) => {
		if (text.length === 0) {
			setText("");
			onNumberChange?.(undefined);
			return;
		}
		const regex = new RegExp(/^[0-9]+\.?[0-9]*$/);
		const result = text.match(regex);
		if (result === null) return;
		const number = parseFloat(text);
		if (!Number.isNaN(number)) onNumberChange?.(number);
		setText(text);
	};

	useEffect(() => {
		if (
			(text.length === 0 && number !== undefined) ||
			(text.length !== 0 && parseFloat(text) !== number)
		)
			setText(number?.toString() ?? "");
	}, [text, number]);

	return (
		<Input
			{...props}
			value={text}
			onChange={(event) => handelTextChange(event.target.value)}
			type={"number"}
		/>
	);
};

export default NumberInput;
