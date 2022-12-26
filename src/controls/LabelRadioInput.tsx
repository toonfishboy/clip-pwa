import {FC} from "react";
import LabelWrapper from "./LabelWrapper";
import RadioButton from "./RadioGroup/RadioButton";
import LabelText from "./LabelText";
import NumberInput from "./NumberInput";

interface LabelRadioInputProps {
    number: number | undefined;
    onNumberChange: (number: number | undefined) => void;
    selected: string;
    label: string;
    radioValue: string;
    errorText?: string;
}

const LabelRadioInput: FC<LabelRadioInputProps> = (
    {
        errorText,
        onNumberChange,
        number,
        selected,
        label,
        radioValue
    }) => (
    <LabelWrapper header={
        <div className={"flex gap-1 items-center"}>
            <RadioButton value={radioValue}/>
            <LabelText>{label}</LabelText>
        </div>
    }>
        <NumberInput number={number} disabled={selected === radioValue} onChangeNumber={onNumberChange}/>
        {errorText && <div className={"text-rose-600"}>{errorText}</div>}
    </LabelWrapper>
);

export default LabelRadioInput;
