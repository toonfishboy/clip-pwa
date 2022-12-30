import { FC, useState } from "react";
import NumberInput from "../../../controls/Inputs/NumberInput";
import LabelWrapper from "../../../controls/LabelWrapper";
import { round } from "../../../utils/helper";

type PressureValues = {
	kpa: number | undefined;
	bar: number | undefined;
	psi: number | undefined;
};

type UnitType<Type, Key extends keyof Type = keyof Type, Value extends Type[Key] = Type[Key]> = {
	[Property in Key]: { label: string; multiplier: number; value: Value };
};

const pressureType: UnitType<PressureValues> = {
	bar: { label: "Bar", multiplier: 1, value: undefined },
	kpa: { label: "Kpa", multiplier: 0.01, value: undefined },
	psi: { label: "Psi", multiplier: 0.145, value: undefined },
};

function getOptions<Type>(type: UnitType<Type>) {
	return Object.keys(type).map((key) => ({
		key: key as keyof UnitType<Type>,
		...type[key as keyof UnitType<Type>],
	}));
}

function getTypeKeys<Type, Key extends keyof Type = keyof Type>(type: UnitType<Type>): Key[] {
	return Object.keys(type).map((key) => key as Key);
}

const PressureUnit: FC = () => {
	const [pressureValues, setPressureValues] = useState(pressureType);

	const updateValue = (key: keyof PressureValues) => (value: number | undefined) => {
		if (!value) {
			setPressureValues({ ...pressureValues, [key]: { ...pressureValues[key], value } });
			return;
		}
		const multiplier = pressureValues[key].multiplier;
		const getValue = (fieldKey: keyof PressureValues) => {
			return round((value / multiplier) * pressureValues[fieldKey].multiplier);
		};

		const updatedValue: UnitType<PressureValues> = {...pressureValues};
		getTypeKeys(pressureValues).forEach((currentKey) =>{
            const currentValue = pressureValues[currentKey];
            updatedValue[currentKey] = key !== currentKey ? {...currentValue, value: getValue(currentKey)} : currentValue;
		});
		setPressureValues(updatedValue);
	};

	const pressureOptions = getOptions(pressureValues);

	return (
		<>
			{pressureOptions.map(({ key, label }) => (
				<LabelWrapper label={label} key={key}>
					<NumberInput
						number={pressureValues[key].value}
						onNumberChange={updateValue(key)}
					/>
				</LabelWrapper>
			))}
		</>
	);
};

export default PressureUnit;
