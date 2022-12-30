import { FC, useMemo, useState } from "react";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import { pipeCalculator, SelectedPipeValue } from "../../utils/clipCalc";
import Button from "../../controls/Layout/Button";
import { checkNaN, hasRequiredValues } from "../../utils/helper";
import Header from "../../controls/Layout/Header";
import RadioGroup from "../../controls/RadioGroup/RadioGroup";
import LabelRadioInput from "../../controls/LabelRadioInput";
import LabelText from "../../controls/LabelText";
import ListSelect from "../../controls/Inputs/ListSelect";

export type PipeValues = {
	volume: number | undefined;
	length: number | undefined;
	pressureLoss: number | undefined;
	netPressure: number | undefined;
	diameter: number | undefined;
};

type VolumeUnit = "m³/m" | "m³/h";

const defaultPipeValues: PipeValues = {
	volume: undefined,
	length: undefined,
	netPressure: undefined,
	pressureLoss: undefined,
	diameter: undefined,
};

const PipeCableCalculator: FC = () => {
	const [pipeValues, setPipeValues] = useState<PipeValues>(defaultPipeValues);
	const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("m³/m");
	const [selected, setSelected] = useState<SelectedPipeValue>("diameter");
	const [getPipeValues, updatePipeValues] = useUpdateValue(pipeValues, setPipeValues);

	const resetValues = () => setPipeValues(defaultPipeValues);

	const isPressureError =
		pipeValues.pressureLoss !== undefined &&
		pipeValues.netPressure !== undefined &&
		pipeValues.pressureLoss > pipeValues.netPressure &&
		selected !== "pressureLoss";

	const result = useMemo(() => {
		const { volume = 0, length = 0, pressureLoss = 0, netPressure = 0, diameter = 0 } = pipeValues;
		if (!hasRequiredValues(pipeValues, selected)) return;
		return pipeCalculator(volume, length, pressureLoss, netPressure, diameter, selected);
	}, [pipeValues, selected]);

	const getCalcValue = <Key extends keyof PipeValues>(key: Key) => {
		if (key === selected) return checkNaN(result?.result);
		return getPipeValues(key);
	};

	return (
		<div className={"flex flex-col"}>
			<Header title={"Rohrleitung"} />
			<div className={"flex flex-col m-2 gap-2"}>
				<RadioGroup
					selected={selected}
					onSelectChange={(selected) => setSelected(selected as SelectedPipeValue)}
				>
					<ListSelect
						selected={volumeUnit}
						options={["m³/m", "m³/h"]}
						onStringChange={(unit) => setVolumeUnit(unit as VolumeUnit)}
					/>
					<LabelRadioInput
						number={getCalcValue("volume")}
						selected={selected}
						radioValue={"volume"}
						label={"Volumen:"}
						onNumberChange={updatePipeValues("volume")}
					/>
					<LabelRadioInput
						number={getCalcValue("length")}
						selected={selected}
						radioValue={"length"}
						label={"Länge [m]:"}
						onNumberChange={updatePipeValues("length")}
					/>
					<LabelRadioInput
						number={getCalcValue("pressureLoss")}
						selected={selected}
						radioValue={"pressureLoss"}
						label={"Druckverluste [bar]:"}
						onNumberChange={updatePipeValues("pressureLoss")}
					/>
					<LabelRadioInput
						number={getCalcValue("netPressure")}
						selected={selected}
						radioValue={"netPressure"}
						label={"Netzdruck [barÜ]:"}
						onNumberChange={updatePipeValues("netPressure")}
						errorText={
							isPressureError
								? "Der Druckverlust kann nicht höher als der Netzdruck sein"
								: undefined
						}
					/>
					<LabelRadioInput
						number={getCalcValue("diameter")}
						selected={selected}
						radioValue={"diameter"}
						label={"Rohrinnendurchmesser di[mm]:"}
						onNumberChange={updatePipeValues("diameter")}
					/>
					{!isNaN(result?.pipeVolume ?? NaN) && (
						<LabelText>Das Rohr hat ein Volumen von: {result?.pipeVolume} Liter</LabelText>
					)}
					{!isNaN(result?.airSpeed ?? NaN) && (
						<LabelText>Die Luft Geschwindigkeit beträgt: {result?.airSpeed} [m/s]</LabelText>
					)}
				</RadioGroup>
				<div className={"flex"}>
					<Button onClick={resetValues}>Zurücksetzen</Button>
				</div>
			</div>
		</div>
	);
};

export default PipeCableCalculator;
