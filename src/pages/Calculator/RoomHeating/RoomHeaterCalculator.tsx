import { FC, useMemo, useState } from "react";
import ListSelect, { ListOption } from "../../../controls/Inputs/ListSelect";
import NumberInput from "../../../controls/Inputs/NumberInput";
import LabelWrapper from "../../../controls/LabelWrapper";
import Container from "../../../controls/Layout/Container";
import Footer from "../../../controls/Layout/Footer";
import Header from "../../../controls/Layout/Header";
import { useUpdateValue } from "../../../hooks/useUpdateValue";
import { hasRequiredValues } from "../../../utils/helper";
import { calcEnergyPrice, calcRoomHeating } from "./RoomHeaterCalc";
import {
	EnergyPriceResult,
	EnergyPriceValues,
	EnergyType,
	RoomHeaterResult,
	RoomHeaterValues,
} from "./RoomHeaterTypes";

export const defaultRoomHeatingValues: RoomHeaterValues = {
	motorOutputPower: undefined,
	motorEfficiency: undefined,
	usageHours: undefined,
	usageMonths: undefined,
	heatTransferEfficiency: undefined,
};

export const defaultEnergyPriceValues: EnergyPriceValues = {
	consumptionYear: undefined,
	price: undefined,
	outputPower: undefined,
	co2Emissions: undefined,
	heaterEfficiency: undefined,
};

const options: ListOption<EnergyType>[] = [
	{ label: "Heizöl", key: "heatOil", value: "heatOil" },
	{ label: "Erdgas", key: "earthGas", value: "earthGas" },
];

const getEmail = (
	roomHeaterResult: RoomHeaterResult | undefined,
	energyPriceResult: EnergyPriceResult | undefined,
	isOil: boolean,
) => `
	Motoraufnahmeleistung [kw]: ${roomHeaterResult?.motorPowerUsage} \n
	Nutzbare Energie pro Laststunde Öl [kwh]: ${roomHeaterResult?.availableOilPower} \n
	Nutzbare Energie pro Laststunde Luft [kwh]: ${roomHeaterResult?.availableAirPower} \n
	Wärmeleistung eff. mit Wärmetauscher [kw]: ${
		roomHeaterResult?.heatPowerEfficiencyWithHeatTransfer
	} \n
	Erzeugte Wärmeleistung WRG [kwh/Jahr]: ${roomHeaterResult?.generatedHeatPowerWRG} \n
	Erzeugte Wärmeleistung Lüftungstechnik [kwh/Jahr]: ${roomHeaterResult?.generatedHeatPowerAir} \n
	Kosten [€]:  ${energyPriceResult?.completePrice} \n
	Erzeugte Energie [kwh/Jahr]:  ${energyPriceResult?.generatedEnergy} \n
	Wärmeleistung eff. ${isOil ? "Öl" : "Gase"}heizung [kwh/Jahr]:  ${
	energyPriceResult?.heatPowerEfficiency
} \n
	Einsparung WRG mit Wärmetauscher [€/Jahr]:  ${energyPriceResult?.savingsWRGHeat.price} \n
	Einsparung mit Lüftungsanlage [€/Jahr]:  ${energyPriceResult?.savingsAir.price} \n
	Einsparung WRG mit Wärmetauscher [kg-CO2/Jahr]:  ${energyPriceResult?.savingsWRGHeat.co2} \n
	Einsparung mit Lüftungsanlage [kg-CO2/Jahr]:  ${energyPriceResult?.savingsAir.co2}\n
`;

const RoomHeaterCalculator: FC = () => {
	const [selectedEnergy, setSelectedEnergy] = useState<ListOption<EnergyType>>(options[0]);
	const [roomHeatingValues, setRoomHeatingValues] =
		useState<RoomHeaterValues>(defaultRoomHeatingValues);
	const [energyPriceValues, setEnergyPriceValues] =
		useState<EnergyPriceValues>(defaultEnergyPriceValues);
	const [getRoomHeatingValues, updateRoomHeatingValues] = useUpdateValue(
		roomHeatingValues,
		setRoomHeatingValues,
	);
	const [getEnergyPriceValues, updateEnergyPriceValues] = useUpdateValue(
		energyPriceValues,
		setEnergyPriceValues,
	);

	const roomHeatingResult = useMemo(() => {
		if (!hasRequiredValues(roomHeatingValues)) return;
		return calcRoomHeating(roomHeatingValues);
	}, [roomHeatingValues]);

	const energyPriceResult = useMemo(() => {
		if (!(hasRequiredValues(energyPriceValues) && roomHeatingResult)) return;
		return calcEnergyPrice(energyPriceValues, selectedEnergy.value ?? "heatOil", roomHeatingResult);
	}, [energyPriceValues, selectedEnergy, roomHeatingResult]);

	const resetValues = () => {
		setRoomHeatingValues(defaultRoomHeatingValues);
		setEnergyPriceValues(defaultEnergyPriceValues);
	};

	const isOil = selectedEnergy.value === "heatOil";
	return (
		<Container>
			<Header title="Raumheizung durch Abluftwärme" />
			<Container className={"m-2 gap-2"}>
				<LabelWrapper label="Motorabgabeleistung bei Betriebsdruck [kw]:">
					<NumberInput
						number={getRoomHeatingValues("motorOutputPower")}
						onNumberChange={updateRoomHeatingValues("motorOutputPower")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Motorwirkungsgrad [%]:">
					<NumberInput
						number={getRoomHeatingValues("motorEfficiency")}
						onNumberChange={updateRoomHeatingValues("motorEfficiency")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Laststunden pro Tag [h]:">
					<NumberInput
						number={getRoomHeatingValues("usageHours")}
						onNumberChange={updateRoomHeatingValues("usageHours")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Heizperiode im Jahr [M(30T)]:">
					<NumberInput
						number={getRoomHeatingValues("usageMonths")}
						onNumberChange={updateRoomHeatingValues("usageMonths")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Wirkungsgrad Wärmetauscher [%]:">
					<NumberInput
						number={getRoomHeatingValues("heatTransferEfficiency")}
						onNumberChange={updateRoomHeatingValues("heatTransferEfficiency")}
					/>
				</LabelWrapper>
				<div className="flex flex-wrap gap-2">
					<LabelWrapper label="Motoraufnahmeleistung [kw]:" className="result-display">
						<NumberInput number={roomHeatingResult?.motorPowerUsage} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Nutzbare Energie pro Laststunde Öl [kwh]:"
						className="result-display"
					>
						<NumberInput number={roomHeatingResult?.availableOilPower} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Nutzbare Energie pro Laststunde Luft [kwh]:"
						className="result-display"
					>
						<NumberInput number={roomHeatingResult?.availableAirPower} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Wärmeleistung eff. mit Wärmetauscher [kw]:"
						className="result-display"
					>
						<NumberInput
							number={roomHeatingResult?.heatPowerEfficiencyWithHeatTransfer}
							disabled={true}
						/>
					</LabelWrapper>
					<LabelWrapper label="Erzeugte Wärmeleistung WRG [kwh/Jahr]:" className="result-display">
						<NumberInput number={roomHeatingResult?.generatedHeatPowerWRG} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Erzeugte Wärmeleistung Lüftungstechnik [kwh/Jahr]:"
						className="result-display"
					>
						<NumberInput number={roomHeatingResult?.generatedHeatPowerAir} disabled={true} />
					</LabelWrapper>
				</div>
				<LabelWrapper label="Energie Träger">
					<ListSelect
						selected={selectedEnergy}
						onOptionChange={setSelectedEnergy}
						options={options}
					/>
				</LabelWrapper>
				<LabelWrapper label={`Preis ${selectedEnergy.label} [${isOil ? "€/hl" : "€/m³"}]:`}>
					<NumberInput
						number={getEnergyPriceValues("price")}
						onNumberChange={updateEnergyPriceValues("price")}
					/>
				</LabelWrapper>
				<LabelWrapper label={`Verbrauch pro Jahr [${isOil ? "hl" : "m³"}]:`}>
					<NumberInput
						number={getEnergyPriceValues("consumptionYear")}
						onNumberChange={updateEnergyPriceValues("consumptionYear")}
					/>
				</LabelWrapper>
				<LabelWrapper label={`Brennwert ${selectedEnergy.label} [kwh/${isOil ? "l" : "m³"}]:`}>
					<NumberInput
						number={getEnergyPriceValues("outputPower")}
						onNumberChange={updateEnergyPriceValues("outputPower")}
					/>
				</LabelWrapper>
				<LabelWrapper
					label={`CO2 Emissionen ${selectedEnergy.label} [kg-CO2/${isOil ? "hl" : "m³"}]:`}
				>
					<NumberInput
						number={getEnergyPriceValues("co2Emissions")}
						onNumberChange={updateEnergyPriceValues("co2Emissions")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Wirkungsgrad der Heizung [%]:">
					<NumberInput
						number={getEnergyPriceValues("heaterEfficiency")}
						onNumberChange={updateEnergyPriceValues("heaterEfficiency")}
					/>
				</LabelWrapper>
				<div className="flex flex-wrap gap-2">
					<LabelWrapper label="Kosten [€]:" className="result-display">
						<NumberInput number={energyPriceResult?.completePrice} disabled={true} />
					</LabelWrapper>
					<LabelWrapper label="Erzeugte Energie [kwh/Jahr]:" className="result-display">
						<NumberInput number={energyPriceResult?.generatedEnergy} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label={`Wärmeleistung eff. ${isOil ? "Öl" : "Gase"}heizung [kwh/Jahr]:`}
						className="result-display"
					>
						<NumberInput number={energyPriceResult?.heatPowerEfficiency} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Einsparung WRG mit Wärmetauscher [€/Jahr]:"
						className="result-display"
					>
						<NumberInput number={energyPriceResult?.savingsWRGHeat.price} disabled={true} />
					</LabelWrapper>
					<LabelWrapper label="Einsparung mit Lüftungsanlage [€/Jahr]:" className="result-display">
						<NumberInput number={energyPriceResult?.savingsAir.price} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Einsparung WRG mit Wärmetauscher [kg-CO2/Jahr]:"
						className="result-display"
					>
						<NumberInput number={energyPriceResult?.savingsWRGHeat.co2} disabled={true} />
					</LabelWrapper>
					<LabelWrapper
						label="Einsparung mit Lüftungsanlage [kg-CO2/Jahr]:"
						className="result-display"
					>
						<NumberInput number={energyPriceResult?.savingsAir.co2} disabled={true} />
					</LabelWrapper>
				</div>
				<Footer
					resetValues={resetValues}
					subject="Raumheizung durch Abluftwärme"
					getEmail={() => getEmail(roomHeatingResult, energyPriceResult, isOil)}
				/>
			</Container>
		</Container>
	);
};

export default RoomHeaterCalculator;
