import type { FC } from 'react';
import NumberInput from './Inputs/NumberInput';
import LabelWrapper from './LabelWrapper';
import HelperText from './Layout/HelperText';
import RadioButton, { type RadioButtonProps } from './RadioGroup/RadioButton';

interface LabelRadioInputProps extends Omit<RadioButtonProps, 'value'> {
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
	<LabelWrapper header={<RadioButton label={label} value={radioValue} />}>
		<NumberInput number={number} disabled={selected === radioValue} onNumberChange={onNumberChange} />
		{errorText && <HelperText type="error">{errorText}</HelperText>}
	</LabelWrapper>
);

export default LabelRadioInput;
