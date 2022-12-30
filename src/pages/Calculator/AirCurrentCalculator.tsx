import { FC, useMemo, useState } from "react";
import ListSelect, { ListOption } from "../../controls/Inputs/ListSelect";
import NumberInput from "../../controls/Inputs/NumberInput";
import { RadioHeader } from "../../controls/LabelRadioInput";
import LabelWrapper from "../../controls/LabelWrapper";
import Button from "../../controls/Layout/Button";
import Container from "../../controls/Layout/Container";
import Header from "../../controls/Layout/Header";
import RadioGroup from "../../controls/RadioGroup/RadioGroup";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import { airCurrentCalculator, SelectedAirCurrentValue } from "../../utils/clipCalc";
import { checkNaN, hasRequiredValues, round } from "../../utils/helper";

const volumeOptions: ListOption<number | undefined>[] = [
	{ label: "Keine Auswahl", key: "", value: undefined },
	{ label: "3 kw [800]", key: "800", value: 800 },
	{ label: "4 kw [1100]", key: "1100", value: 1100 },
	{ label: "5,5 kw [1500]", key: "1500", value: 1500 },
	{ label: "7,5 kw [2000]", key: "2000", value: 2000 },
	{ label: "11 kw [2200]", key: "2200", value: 2200 },
	{ label: "15 kw [2500]", key: "2500", value: 2500 },
	{ label: "18,5 kw [3800]", key: "3800", value: 3800 },
	{ label: "22 kw [4500]", key: "4500", value: 4500 },
	{ label: "30 kw [5500]", key: "5500", value: 5500 },
	{ label: "37 kw [6200]", key: "6200", value: 6200 },
	{ label: "45 kw [6500]", key: "6500", value: 6500 },
	{ label: "55 kw [8000]", key: "8000", value: 8000 },
	{ label: "65 kw [8600]", key: "8600", value: 8600 },
	{ label: "75 kw [10000]", key: "10000", value: 10000 },
	{ label: "90 kw [16000]", key: "16000", value: 16000 },
	{ label: "110 kw [18000]", key: "18000", value: 18000 },
	{ label: "132 kw [24400]", key: "24400", value: 24400 },
	{ label: "160 kw [26000]", key: "26000", value: 26000 },
	{ label: "200 kw [28000]", key: "28000", value: 28000 },
	{ label: "250 kw [32000]", key: "32000", value: 32000 },
];

const velocityOptions: ListOption<number | undefined>[] = [
	{ label: "Keine Auswahl", key: "", value: undefined },
	{ label: "Abluft", key: "4.0", value: 4.0 },
	{ label: "Zuluft", key: "2.0", value: 2.0 },
];

type AirCurrentValues = {
	volume: number | undefined;
	velocity: number | undefined;
	diameter: number | undefined;
	area: number | undefined;
	length: number | undefined;
	width: number | undefined;
};

const defaultAirCurrentValues: AirCurrentValues = {
	volume: undefined,
	velocity: undefined,
	diameter: undefined,
	area: undefined,
	length: undefined,
	width: undefined,
};

const AirCurrentCalculator: FC = () => {
	const [airCurrentValues, setAirCurrentValues] =
		useState<AirCurrentValues>(defaultAirCurrentValues);
	const [selected, setSelected] = useState<SelectedAirCurrentValue>("area");
	const [getAirCurrentValues, updateAirCurrentValues] = useUpdateValue(
		airCurrentValues,
		setAirCurrentValues,
	);
	const resetValues = () => setAirCurrentValues(defaultAirCurrentValues);

	const result = useMemo(() => {
		const { volume = 0, velocity = 0, area = 0 } = airCurrentValues;
		//calculate the areaValue based on the given parameters
		if (!hasRequiredValues({ volume, velocity, area }, selected)) return;
		return airCurrentCalculator(volume, velocity, area, selected);
	}, [airCurrentValues, selected]);

	const updateArea =
		(field: "area" | "width" | "length" | "diameter") => (value: number | undefined) => {
			updateAirCurrentValues(field)(value);
			if (value === undefined) return;
			const { length, width } = airCurrentValues;
			if (field === "width" && length) updateAirCurrentValues("area")(round(length * value));
			else if (field === "length" && width) updateAirCurrentValues("area")(round(width * value));
			else if (field === "diameter") updateAirCurrentValues("area")(round((value / 2) * Math.PI));
		};

	const getCalcValue = <Key extends keyof AirCurrentValues>(key: Key) => {
		if ((key === "velocity" || key === "volume" || key === "area") && key === selected)
			return checkNaN(result);
		if (selected === "area" && (key === "width" || key === "length" || key === "diameter")) {
			if (key === "length" || key === "width") {
				const value = checkNaN(Math.sqrt(result ?? 0));
				return value !== undefined ? round(value) : undefined;
			} else {
				const value = checkNaN(Math.sqrt((result ?? 0) / Math.PI));
				return value !== undefined ? round(value) : undefined;
			}
		}
		return getAirCurrentValues(key);
	};

	const selectedVolume = volumeOptions.find(
		(option) => option.value === getAirCurrentValues("volume"),
	);
	const selectedVelocity = velocityOptions.find(
		(option) => option.value === getAirCurrentValues("velocity"),
	);

	return (
		<Container>
			<Header title="Lüftungstechnik" />
			<Container className={"m-2 gap-2"}>
				<RadioGroup
					selected={selected}
					onSelectChange={(selected) => setSelected(selected as SelectedAirCurrentValue)}
				>
					<LabelWrapper
						className="gap-2"
						header={<RadioHeader label="Kühlluftmenge [m³/h]:" radioValue={"volume"} />}
					>
						<ListSelect
							disabled={selected === "volume"}
							options={volumeOptions}
							selected={selectedVolume ?? volumeOptions[0]}
							onOptionChange={(option) => updateAirCurrentValues("volume")(option.value)}
						/>
						<NumberInput
							disabled={selected === "volume"}
							number={getCalcValue("volume")}
							onNumberChange={updateAirCurrentValues("volume")}
						/>
					</LabelWrapper>
					<LabelWrapper
						className="gap-2"
						header={
							<RadioHeader label="Empfohlene Geschwindigkeit [m/s]:" radioValue={"velocity"} />
						}
					>
						<ListSelect
							disabled={selected === "volume"}
							options={velocityOptions}
							selected={selectedVelocity ?? velocityOptions[0]}
							onOptionChange={(option) => updateAirCurrentValues("velocity")(option.value)}
						/>
						<NumberInput
							disabled={selected === "velocity"}
							number={getCalcValue("velocity")}
							onNumberChange={updateAirCurrentValues("velocity")}
						/>
					</LabelWrapper>
					<LabelWrapper header={<RadioHeader label="Freie Fläche [m²]:" radioValue={"area"} />}>
						<NumberInput
							disabled={selected === "area"}
							number={getCalcValue("area")}
							onNumberChange={updateAirCurrentValues("area")}
						/>
						<div className="flex gap-2 w-full items-center">
							<LabelWrapper label="Länge [m]:" className="grow">
								<NumberInput
									disabled={selected === "area"}
									number={getCalcValue("length")}
									onNumberChange={updateArea("length")}
								/>
							</LabelWrapper>
							<LabelWrapper label="Breite [m]:" className="grow">
								<NumberInput
									disabled={selected === "area"}
									number={getCalcValue("width")}
									onNumberChange={updateArea("width")}
								/>
							</LabelWrapper>
						</div>
						<LabelWrapper label="Durchmesser [m]:">
							<NumberInput
								disabled={selected === "area"}
								number={getCalcValue("diameter")}
								onNumberChange={updateArea("diameter")}
							/>
						</LabelWrapper>
					</LabelWrapper>
				</RadioGroup>
				<div className={"flex"}>
					<Button onClick={resetValues}>Zurücksetzen</Button>
				</div>
			</Container>
		</Container>
	);
};

export default AirCurrentCalculator;
