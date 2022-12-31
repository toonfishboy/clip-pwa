import { FC, useMemo, useState } from "react";
import NumberInput from "../../controls/Inputs/NumberInput";
import LabelWrapper from "../../controls/LabelWrapper";
import Container from "../../controls/Layout/Container";
import Footer from "../../controls/Layout/Footer";
import Header from "../../controls/Layout/Header";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import { condensateCalculator, CondensateResult } from "../../utils/clipCalc";
import { hasRequiredValues } from "../../utils/helper";

export type CondensateValues = {
	airTemp: number | undefined;
	humidity: number | undefined;
	airDelivery: number | undefined;
	pressure: number | undefined;
	coolTemp: number | undefined;
	dtp: number | undefined;
	hours: number | undefined;
};

const defaultCondensateValues: CondensateValues = {
	airTemp: 20,
	humidity: 50,
	airDelivery: undefined,
	pressure: 7,
	coolTemp: 50,
	dtp: 5,
	hours: 1,
};

const getEmail = (
	condensateValues: CondensateValues,
	condensateResult: CondensateResult | undefined,
) => `
	Umgebungstemperatur [C]: ${condensateValues.airTemp} \r\n
    Relative Feuchte der Ansaugluft [%]: ${condensateValues.humidity} \n
    Liefermenge des Kompressors [m³/min]:  ${condensateValues.airDelivery} \n
    Verdichtungsenddruck [barÜ]: ${condensateValues.pressure} \n
    Kompressor Austrittstemperatur [°C]: ${condensateValues.coolTemp} \n
    Drucktaupunkt [°C]: ${condensateValues.dtp} \n
    Stunden: ${condensateValues.hours} \n
    Angesaugte Wasser Menge [l/h]: ${condensateResult?.waterAmount} \n
    Kondensat Ausfall nach Verdichtung [l/h]: ${condensateResult?.condensateLoss} \n
    Restfeuchte [l/h]: ${condensateResult?.remainingHumidity} \n
    Kondensat nach Kältetrockner [l/h]: ${condensateResult?.coldLoss} \n
    Kondensat Ausfall insgesamt [l/h]: ${condensateResult?.totalLoss} \n
    Restfeuchte nach Kältetrockner [l/h]: ${condensateResult?.coldHumidity}
`;

const CondensateCalculator: FC = () => {
	const [condensateValues, setCondensateValues] =
		useState<CondensateValues>(defaultCondensateValues);
	const [getCondensateValues, updateCondensateValues] = useUpdateValue(
		condensateValues,
		setCondensateValues,
	);
	const resetValues = () => setCondensateValues(defaultCondensateValues);

	const result = useMemo(() => {
		const {
			airTemp = 0,
			humidity = 0,
			airDelivery = 0,
			pressure = 0,
			coolTemp = 0,
			dtp = 0,
			hours = 0,
		} = condensateValues;
		if (!hasRequiredValues(condensateValues)) return;
		return condensateCalculator(airTemp, humidity, airDelivery, pressure, coolTemp, dtp, hours);
	}, [condensateValues]);

	return (
		<Container>
			<Header title="Kondensat" />
			<Container className={"m-2 gap-2"}>
				<LabelWrapper label="Umgebungstemperatur [°C]:">
					<NumberInput
						number={getCondensateValues("airTemp")}
						onNumberChange={updateCondensateValues("airTemp")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Relative Feuchte der Ansaugluft [%]:">
					<NumberInput
						number={getCondensateValues("humidity")}
						onNumberChange={updateCondensateValues("humidity")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Liefermenge des Kompressors [m³/min]:">
					<NumberInput
						number={getCondensateValues("airDelivery")}
						onNumberChange={updateCondensateValues("airDelivery")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Verdichtungsenddruck [barÜ]:">
					<NumberInput
						number={getCondensateValues("pressure")}
						onNumberChange={updateCondensateValues("pressure")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Kompressor Austrittstemperatur [°C]:">
					<NumberInput
						number={getCondensateValues("coolTemp")}
						onNumberChange={updateCondensateValues("coolTemp")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Drucktaupunkt [°C]:">
					<NumberInput
						number={getCondensateValues("dtp")}
						onNumberChange={updateCondensateValues("dtp")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Stunden:">
					<NumberInput
						number={getCondensateValues("hours")}
						onNumberChange={updateCondensateValues("hours")}
					/>
				</LabelWrapper>
				<div className="flex flex-wrap gap-2">
					<LabelWrapper label="Angesaugte Wasser Menge [l/h]:" className="result-display">
						<NumberInput number={result?.waterAmount} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Kondensat Ausfall nach Verdichtung [l/h]:"
						className="result-display"
					>
						<NumberInput number={result?.condensateLoss} disabled={true} />
					</LabelWrapper>
					<LabelWrapper label="Restfeuchte [l/h]:" className="result-display">
						<NumberInput number={result?.remainingHumidity} disabled={true} />
					</LabelWrapper>
					<LabelWrapper label="Kondensat nach Kältetrockner [l/h]:" className="result-display">
						<NumberInput number={result?.coldLoss} disabled={true} />
					</LabelWrapper>
					<LabelWrapper label="Kondensat Ausfall insgesamt [l/h]:" className="result-display">
						<NumberInput number={result?.totalLoss} disabled={true} />
					</LabelWrapper>
					<LabelWrapper label="Restfeuchte nach Kältetrockner [l/h]:" className="result-display">
						<NumberInput number={result?.coldHumidity} disabled={true} />
					</LabelWrapper>
				</div>
				<Footer
					resetValues={resetValues}
					subject="Kondensat"
					getEmail={() => getEmail(condensateValues, result)}
				/>
			</Container>
		</Container>
	);
};

export default CondensateCalculator;
