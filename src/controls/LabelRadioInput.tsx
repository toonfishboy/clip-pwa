import { FC } from "react";
import LabelWrapper from "./LabelWrapper";
import RadioButton from "./RadioGroup/RadioButton";
import LabelText from "./LabelText";
import NumberInput from "./Inputs/NumberInput";
import HelperText from "./Layout/HelperText";

interface RadioHeaderProps {
	label: string;
	radioValue: string;
}

export const RadioHeader: FC<RadioHeaderProps> = ({ radioValue, label }) => (
	<div className={"flex gap-1 items-center"}>
		<RadioButton value={radioValue} />
		<LabelText>{label}</LabelText>
	</div>
);

interface LabelRadioInputProps extends RadioHeaderProps {
	number: number | undefined;
	onNumberChange: (number: number | undefined) => void;
	selected: string;
	label: string;
	radioValue: string;
	errorText?: string;
}

const LabelRadioInput: FC<LabelRadioInputProps> = ({
	errorText,
	onNumberChange,
	number,
	selected,
	label,
	radioValue,
}) => (
	<LabelWrapper header={<RadioHeader label={label} radioValue={radioValue} />}>
		<NumberInput
			number={number}
			disabled={selected === radioValue}
			onNumberChange={onNumberChange}
		/>
		{errorText && <HelperText type="error">{errorText}</HelperText>}
	</LabelWrapper>
);

export default LabelRadioInput;
