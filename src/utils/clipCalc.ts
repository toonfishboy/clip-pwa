import pressureTable from "../assets/pressureSaturationTable.json";

export type SelectedPipeValue = "volume" | "length" | "pressureLoss" | "netPressure" | "diameter";

export function pipeCalculator(
	volume: number,
	length: number,
	pressureLoss: number,
	netPressure: number,
	diameter: number,
	selected: SelectedPipeValue,
) {
	let calcVolume = volume / 60;
	let calcDiameter = diameter / 1000;
	let calcNetPressure = netPressure + 1;
	let calcPressureLoss = pressureLoss;
	let calcLength = length;
	let result;
	switch (selected) {
		case "volume":
			calcVolume = Math.pow(
				(Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcPressureLoss * calcNetPressure) /
					(1.6 * Math.pow(10, 3) * calcLength),
				1 / 1.85,
			);
			result = calcVolume * 60;
			break;
		case "length":
			calcLength =
				(Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcPressureLoss * calcNetPressure) /
				(1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85));
			result = calcLength;
			break;
		case "pressureLoss":
			calcPressureLoss =
				(1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85) * calcLength) /
				(Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcNetPressure);
			result = calcPressureLoss;
			break;
		case "netPressure":
			calcNetPressure =
				(1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85) * calcLength) /
				(Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcPressureLoss);
			result = calcNetPressure - 1;
			break;
		case "diameter":
			calcDiameter = Math.pow(
				(1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85) * calcLength) /
					(Math.pow(10, 10) * calcPressureLoss * calcNetPressure),
				0.2,
			);
			result = calcDiameter * 1000;
			break;
		default:
			result = 0;
	}
	const pipeArea = Math.pow((calcDiameter * 1000) / 2, 2) * Math.PI;
	const pipeVolume = round((pipeArea / 10000) * (calcLength * 10), 2);
	const airSpeed = round(calcVolume / (pipeArea / 1000000) / calcNetPressure, 2);
	result = round(result, 2);
	return { result, pipeVolume, airSpeed };
}

export type FlowValue = "volume" | "velocity" | "area";

export function flowCalculator(volume: number, velocity: number, area: number, toCalc: FlowValue) {
	let calcVolume = volume / 3600;
	let calcVelocity = velocity;
	let calcArea = area;
	let result;
	switch (toCalc) {
		case "volume":
			calcVolume = calcVelocity * calcArea;
			result = calcVolume * 3600;
			break;
		case "velocity":
			calcVelocity = calcVolume / calcArea;
			result = calcVelocity;
			break;
		case "area":
			calcArea = calcVolume / calcVelocity;
			result = calcArea;
			break;
		default:
			result = 0;
	}
	result = round(result, 2);
	return result;
}

export type SelectedLeakageValue = "leakageCurrent" | "hole";

export function leakageCalculator(
	pressureP1: number,
	pressureP2: number,
	temperature: number,
	kappa: number,
	gas: number,
	hole: number,
	leakageCurrent: number,
	toCalc: SelectedLeakageValue,
): [number, number] {
	const calcTemp = 273 + temperature;
	const pressure = pressureP2 / pressureP1;
	const kappa1 = (kappa - 1) / kappa;
	const kappa2 = kappa / (kappa - 1);
	const pressureA = Math.pow(pressure, 1 / kappa);
	const pressureB = Math.pow(pressure, kappa1);
	const x = Math.pow(2 / (kappa + 1), kappa2);
	const xA = Math.pow(x, 1 / kappa);
	const density = (pressureP1 * 100000) / gas / calcTemp;
	let psi;
	if (pressure >= x) {
		psi = Math.pow(kappa2 * Math.pow(pressureA, 2) * (1 - pressureB), 0.5);
	} else {
		psi = Math.pow(kappa2 * (Math.pow(xA, 2) * (1 - xA)), 0.5);
	}
	switch (toCalc) {
		case "leakageCurrent":
			const vv =
				(((Math.PI * Math.pow(hole / 1000, 2)) / 4) *
					psi *
					Math.pow(2 * pressureP1 * 100000 * density, 0.5)) /
				density;
			const maximal = vv * 60 * 1000;
			return [round(maximal, 2), round(maximal * 0.59, 2)];
		case "hole":
			const calcLeakage = leakageCurrent / 60000;
			const area = (calcLeakage * density) / psi / Math.pow(2 * pressureP1 * 100000 * density, 0.5);
			const minimal = Math.pow(4 * (area / Math.PI), 0.5) * 1000;
			return [round(minimal / Math.pow(0.59, 0.5), 2), round(minimal, 2)];
	}
}

export function round(result: number, length: number = 3) {
	const moveLength = Math.pow(10, length);
	return Math.round(result * moveLength) / moveLength;
}

export type SelectedContainerValue = "volume" | "engineTolerance";

export function containerCalculator(
	deliveredAmount: number,
	necessaryAmount: number,
	engineTolerance: number,
	offPressure: number,
	onPressure: number,
	volume: number,
	toCalc: SelectedContainerValue,
) {
	volume = volume / 1000;
	switch (toCalc) {
		case "volume":
			return (
				1000 *
				round(
					(deliveredAmount *
						60 *
						(necessaryAmount / deliveredAmount - Math.pow(necessaryAmount / deliveredAmount, 2))) /
						(engineTolerance * (offPressure - onPressure)),
					2,
				)
			);
		case "engineTolerance":
			return round(
				(deliveredAmount *
					60 *
					(necessaryAmount / deliveredAmount - Math.pow(necessaryAmount / deliveredAmount, 2))) /
					(volume * (offPressure - onPressure)),
				2,
			);
	}
}

export function containerLeakageCalculator(
	volume: number,
	onPressure: number,
	offPressure: number,
	measureTime: number,
) {
	volume = volume / 1000;
	measureTime = measureTime / 60;
	return round((volume * (onPressure - offPressure)) / measureTime, 2);
}

export function additionalWorkCalculator(pressureP1: number, temperature: string) {
	const pressureP2 = 1;
	const T2 = 293;
	const KAPPA = 1.4;
	const t0 = 273 + parseFloat(temperature);
	const kappa2 = 1 / (KAPPA / (KAPPA - 1));
	const t1 = T2 * Math.pow(pressureP1 / pressureP2, kappa2);
	return 1 / ((1 - t0 / t1) / (1 - T2 / t1));
}

export function waterAmountCalculator(
	airTemp: number,
	humidity: number,
	airDelivery: number,
	pressure: number = 1,
): number {
	const { table } = pressureTable;
	const entry = table.find((entry) => entry.temp === Math.round(airTemp));
	let saturation = 0;
	if (!entry) {
		if (airTemp <= table[0].temp) saturation = table[0].saturation;
		else if (airTemp >= table[table.length - 1].temp)
			saturation = table[table.length - 1].saturation;
	} else saturation = entry.saturation;
	return (saturation * (humidity / 100) * airDelivery * 60) / (pressure * 1000);
}
