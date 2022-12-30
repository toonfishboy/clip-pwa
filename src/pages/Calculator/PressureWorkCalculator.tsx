import { FC, useMemo, useState } from "react";
import NumberInput from "../../controls/Inputs/NumberInput";
import LabelWrapper from "../../controls/LabelWrapper";
import Button from "../../controls/Layout/Button";
import Container from "../../controls/Layout/Container";
import Header from "../../controls/Layout/Header";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import { pressureWorkCalculator } from "../../utils/clipCalc";
import { hasRequiredValues } from "../../utils/helper";

type PressureWorkValues = {
	pressureP1: number | undefined;
	temperature: number | undefined;
};

const defaultPressureWorkValus: PressureWorkValues = {
	pressureP1: undefined,
	temperature: 20,
};

const PressureWorkCalculator: FC = () => {
	const [pressureWorkValues, setPressureWorkValues] =
		useState<PressureWorkValues>(defaultPressureWorkValus);
	const [getPressureWorkValues, updatePressureWorkValues] = useUpdateValue(
		pressureWorkValues,
		setPressureWorkValues,
	);
	const resetValues = () => setPressureWorkValues(defaultPressureWorkValus);

	const result = useMemo(() => {
		const { pressureP1 = 0, temperature = 0 } = pressureWorkValues;
		if (!hasRequiredValues(pressureWorkValues)) return;
		return pressureWorkCalculator(pressureP1, temperature);
	}, [pressureWorkValues]);

	return (
		<Container>
			<Header title="Verdichtungsarbeit" />
			<Container className={"m-2 gap-2"}>
				<LabelWrapper label="Netzdruck [bar]:">
					<NumberInput
						number={getPressureWorkValues("pressureP1")}
						onNumberChange={updatePressureWorkValues("pressureP1")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Umgebungstemperatur [°C]:">
					<NumberInput
						min={0}
						max={50}
						number={getPressureWorkValues("temperature")}
						onNumberChange={updatePressureWorkValues("temperature")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Leistungsaufnahme [%]:">
					<NumberInput number={result} disabled={true} />
				</LabelWrapper>
				<div className={"flex"}>
					<Button onClick={resetValues}>Zurücksetzen</Button>
				</div>
			</Container>
		</Container>
	);
};

export default PressureWorkCalculator;
