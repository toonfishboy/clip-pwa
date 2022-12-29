import { FC } from "react";
import classNames from "classnames";
import { useRadioGroup } from "./RadioGroup";

interface RadioButtonProps {
	value: string;

	className?: string;
}

const RadioButton: FC<RadioButtonProps> = ({ className, value }) => {
	const { selected, onSelectChange } = useRadioGroup();

	const handleSelect = () => {
		onSelectChange(value);
	};

	return (
		<div
			className={classNames(className, "w-5 h-5 rounded-full border border-black p-1")}
			onClick={handleSelect}
			onKeyDown={handleSelect}
		>
			{selected === value && <div className={"rounded-full w-full h-full bg-rose-700"} />}
		</div>
	);
};

export default RadioButton;
