import { FC, useMemo, useState } from "react";
import Button from "../../controls/Layout/Button";
import Header from "../../controls/Layout/Header";
import HelperText from "../../controls/Layout/HelperText";
import { RadioHeader } from "../../controls/LabelRadioInput";
import LabelWrapper from "../../controls/LabelWrapper";
import ListSelect, { ListOption } from "../../controls/Inputs/ListSelect";
import NumberInput from "../../controls/Inputs/NumberInput";
import RadioGroup from "../../controls/RadioGroup/RadioGroup";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import { leakageCalculator, SelectedLeakageValue } from "../../utils/clipCalc";
import { hasRequiredValues } from "../../utils/helper";
import LabelText from "../../controls/LabelText";
import Input from "../../controls/Inputs/Input";
import Container from "../../controls/Layout/Container";

const mediumOptions: ListOption[] = [
	{ key: "air", label: "Luft" },
	{ key: "oxygen", label: "Sauerstoff" },
	{ key: "carbonDioxide", label: "Kohlenstoffdioxid" },
];

type MediumType = "air" | "oxygen" | "carbonDioxide";

type MediumValues<Type extends MediumType> = {
	[T in Type]: { gas: number; kappa: number };
};

const mediumValues: MediumValues<MediumType> = {
	air: { gas: 287.1, kappa: 1.4 },
	oxygen: { gas: 188.9, kappa: 1.29 },
	carbonDioxide: { gas: 259.8, kappa: 1.4 },
};

type LeakageValues = {
	pressureP1: number | undefined;
	pressureP2: number | undefined;
	temperature: number | undefined;
	kappa: number;
	gas: number;
	leakageCurrent: number | undefined;
	hole: number | undefined;
};

const defaultLeakageValues: LeakageValues = {
	pressureP1: undefined,
	pressureP2: undefined,
	temperature: undefined,
	leakageCurrent: undefined,
	hole: undefined,
	...mediumValues.air,
};

const LeakageCalculator: FC = () => {
	const [leakageValues, setLeakageValues] = useState<LeakageValues>(defaultLeakageValues);
	const [selected, setSelected] = useState<SelectedLeakageValue>("hole");
	const [medium, setMedium] = useState<ListOption>(mediumOptions[0]);
	const [getLeakageValues, updateLeakageValues] = useUpdateValue(leakageValues, setLeakageValues);
	const resetValues = () => setLeakageValues(defaultLeakageValues);

	const result = useMemo(() => {
		const {
			pressureP1 = 0,
			pressureP2 = 0,
			temperature = 0,
			leakageCurrent = 0,
			hole = 0,
			kappa,
			gas,
		} = leakageValues;
		if (!hasRequiredValues(leakageValues, selected)) return;
		return leakageCalculator(
			pressureP1,
			pressureP2,
			temperature,
			kappa,
			gas,
			hole,
			leakageCurrent,
			selected,
		);
	}, [leakageValues, selected]);

	const selectMediumChange = (option: ListOption) => {
		const medium = option.key as MediumType;
		setLeakageValues({ ...leakageValues, ...mediumValues[medium] });
		setMedium(option);
	};

	const isP2Lower = (leakageValues.pressureP1 ?? 0) > (leakageValues.pressureP2 ?? 0);

	return (
		<Container>
			<Header title={"Leckage"} />
			<Container className={"m-2 gap-2"}>
				<LabelWrapper label="Medium">
					<ListSelect
						options={mediumOptions}
						selected={medium}
						onOptionChange={(option) => selectMediumChange(option)}
					/>
				</LabelWrapper>
				<LabelWrapper label="Druck p1 [bar abs]:">
					<NumberInput
						number={getLeakageValues("pressureP1")}
						onNumberChange={updateLeakageValues("pressureP1")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Druck p2 [bar abs]:">
					<NumberInput
						number={getLeakageValues("pressureP2")}
						onNumberChange={updateLeakageValues("pressureP2")}
					/>
				</LabelWrapper>
				{!isP2Lower && leakageValues.pressureP2 !== undefined && (
					<HelperText type="error"> P2 muss kleiner als P1 sein</HelperText>
				)}
				<LabelWrapper label="Temperatur [Grad C]:">
					<NumberInput
						number={getLeakageValues("temperature")}
						onNumberChange={updateLeakageValues("temperature")}
					/>
				</LabelWrapper>
				<RadioGroup
					selected={selected}
					onSelectChange={(selected) => setSelected(selected as SelectedLeakageValue)}
				>
					<LabelWrapper
						header={<RadioHeader radioValue={"leakageCurrent"} label={"Leckagestrom [l/min]:"} />}
					>
						{selected === "leakageCurrent" ? (
							<div className="flex items-center gap-2">
								<LabelText>Max:</LabelText>
								<Input disabled={true} value={result?.[0]} />
								<LabelText>Min:</LabelText>
								<Input disabled={true} value={result?.[1]} />
							</div>
						) : (
							<NumberInput
								number={getLeakageValues("leakageCurrent")}
								onNumberChange={updateLeakageValues("leakageCurrent")}
							/>
						)}
					</LabelWrapper>
					<LabelWrapper
						header={<RadioHeader label={"Bohrungsdurchmesser [mm]:"} radioValue={"hole"} />}
					>
						{selected === "hole" ? (
							<div className="flex items-center gap-2">
								<LabelText>Max:</LabelText>
								<Input disabled={true} value={result?.[0]} />
								<LabelText>Min:</LabelText>
								<Input disabled={true} value={result?.[1]} />
							</div>
						) : (
							<NumberInput
								number={getLeakageValues("hole")}
								onNumberChange={updateLeakageValues("hole")}
							/>
						)}
					</LabelWrapper>
				</RadioGroup>
				<div className={"flex"}>
					<Button onClick={resetValues}>Zurücksetzen</Button>
				</div>
			</Container>
		</Container>
	);
};

export default LeakageCalculator;
