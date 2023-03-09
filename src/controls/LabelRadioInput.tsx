import { FC } from 'react';
import LabelWrapper from './LabelWrapper';
import RadioButton, { RadioButtonProps } from './RadioGroup/RadioButton';
import NumberInput from './Inputs/NumberInput';
import HelperText from './Layout/HelperText';

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
