import { FC, useMemo, useState } from "react";
import NumberInput from "../../controls/NumberInput";
import { containerCalculator, SelectedContainerValue } from "../../utils/clipCalc";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import LabelWrapper from "../../controls/LabelWrapper";
import RadioGroup from "../../controls/RadioGroup/RadioGroup";
import { checkNaN, hasRequiredValues } from "../../utils/helper";
import Header from "../../controls/Header";
import Button from "../../controls/Button";
import LabelRadioInput from "../../controls/LabelRadioInput";

type ContainerValues = {
	deliveredAmount: number | undefined;
	necessaryAmount: number | undefined;
	engineTolerance: number | undefined;
	offPressure: number | undefined;
	onPressure: number | undefined;
	volume: number | undefined;
};

const defaultContainerValues: ContainerValues = {
	deliveredAmount: undefined,
	necessaryAmount: undefined,
	engineTolerance: undefined,
	offPressure: undefined,
	onPressure: undefined,
	volume: undefined,
};

const ContainerCalculator: FC = () => {
	const [containerValues, setContainerValues] = useState<ContainerValues>(defaultContainerValues);
	const [selected, setSelected] = useState<SelectedContainerValue>("volume");
	const [getContainerValues, updateContainerValues] = useUpdateValue(containerValues, setContainerValues);
	const resetValues = () => setContainerValues(defaultContainerValues);

	const result = useMemo(() => {
		const {
			deliveredAmount = 0,
			necessaryAmount = 0,
			engineTolerance = 0,
			offPressure = 0,
			onPressure = 0,
			volume = 0,
		} = containerValues;
		if (!hasRequiredValues(containerValues, selected)) return;
		return containerCalculator(
			deliveredAmount,
			necessaryAmount,
			engineTolerance,
			offPressure,
			onPressure,
			volume,
			selected,
		);
	}, [containerValues, selected]);

	const getCalcValue = <Key extends keyof ContainerValues>(key: Key) => {
		if (key === selected) return checkNaN(result);
		return getContainerValues(key);
	};

	return (
		<div className={"flex flex-col"}>
			<Header title={"Beh??lter Leckage"} />
			<div className={"flex flex-col m-2 gap-2"}>
				<LabelWrapper label={"Liefermenge des Kompressors [m??/min]:"}>
					<NumberInput
						number={getContainerValues("deliveredAmount")}
						onChangeNumber={updateContainerValues("deliveredAmount")}
					/>
				</LabelWrapper>
				<LabelWrapper label={"Ben??tigte Liefermenge [m??/min]:"}>
					<NumberInput
						number={getContainerValues("necessaryAmount")}
						onChangeNumber={updateContainerValues("necessaryAmount")}
					/>
				</LabelWrapper>
				<LabelWrapper label={"Ausschaltdruck des Kompressors [bar??]:"}>
					<NumberInput
						number={getContainerValues("offPressure")}
						onChangeNumber={updateContainerValues("offPressure")}
					/>
				</LabelWrapper>
				<LabelWrapper label={"Einschaltdruck des Kompressors [bar??]:"}>
					<NumberInput number={getContainerValues("onPressure")} onChangeNumber={updateContainerValues("onPressure")} />
				</LabelWrapper>
				<RadioGroup selected={selected} onSelectChange={(selected) => setSelected(selected as SelectedContainerValue)}>
					<LabelRadioInput
						number={getCalcValue("engineTolerance")}
						selected={selected}
						radioValue={"engineTolerance"}
						label={"Zul??ssige Motorschaltspiele/h [1/h]:"}
						onNumberChange={updateContainerValues("engineTolerance")}
					/>
					<LabelRadioInput
						number={getCalcValue("volume")}
						selected={selected}
						radioValue={"volume"}
						label={"Volumen des Druckluftbeh??lters [l]:"}
						onNumberChange={updateContainerValues("volume")}
					/>
				</RadioGroup>
				<div className={"flex"}>
					<Button onClick={resetValues}>Zur??cksetzen</Button>
				</div>
			</div>
		</div>
	);
};

export default ContainerCalculator;
