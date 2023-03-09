import pressureTable from '../assets/pressureSaturationTable.json';
import { round } from './helper';

export type SelectedPipeValue = 'volume' | 'length' | 'pressureLoss' | 'netPressure' | 'diameter';

export type PipeResult = {
  result: number;
  pipeVolume: number;
  airSpeed: number;
};

export function pipeCalculator(
  volume: number,
  length: number,
  pressureLoss: number,
  netPressure: number,
  diameter: number,
  selected: SelectedPipeValue
): PipeResult {
  let calcVolume = volume / 60;
  let calcDiameter = diameter / 1000;
  let calcNetPressure = netPressure + 1;
  let calcPressureLoss = pressureLoss;
  let calcLength = length;
  let result;
  switch (selected) {
    case 'volume':
      calcVolume = Math.pow(
        (Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcPressureLoss * calcNetPressure) /
          (1.6 * Math.pow(10, 3) * calcLength),
        1 / 1.85
      );
      result = calcVolume * 60;
      break;
    case 'length':
      calcLength =
        (Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcPressureLoss * calcNetPressure) /
        (1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85));
      result = calcLength;
      break;
    case 'pressureLoss':
      calcPressureLoss =
        (1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85) * calcLength) /
        (Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcNetPressure);
      result = calcPressureLoss;
      break;
    case 'netPressure':
      calcNetPressure =
        (1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85) * calcLength) /
        (Math.pow(calcDiameter, 5) * Math.pow(10, 10) * calcPressureLoss);
      result = calcNetPressure - 1;
      break;
    case 'diameter':
      calcDiameter = Math.pow(
        (1.6 * Math.pow(10, 3) * Math.pow(calcVolume, 1.85) * calcLength) /
          (Math.pow(10, 10) * calcPressureLoss * calcNetPressure),
        0.2
      );
      result = calcDiameter * 1000;
      break;
    default:
      result = 0;
  }
  const pipeArea = Math.pow((calcDiameter * 1000) / 2, 2) * Math.PI;
  const pipeVolume = round((pipeArea / 10000) * (calcLength * 10));
  const airSpeed = round(calcVolume / (pipeArea / 1000000) / calcNetPressure);
  result = round(result);
  return { result, pipeVolume, airSpeed };
}

export type SelectedAirCurrentValue = 'volume' | 'velocity' | 'area';

export function airCurrentCalculator(
  volume: number,
  velocity: number,
  area: number,
  toCalc: SelectedAirCurrentValue
) {
  let calcVolume = volume / 3600;
  let calcVelocity = velocity;
  let calcArea = area;
  let result;
  switch (toCalc) {
    case 'volume':
      calcVolume = calcVelocity * calcArea;
      result = calcVolume * 3600;
      break;
    case 'velocity':
      calcVelocity = calcVolume / calcArea;
      result = calcVelocity;
      break;
    case 'area':
      calcArea = calcVolume / calcVelocity;
      result = calcArea;
      break;
    default:
      result = 0;
  }
  result = round(result);
  return result;
}

export type SelectedLeakageValue = 'leakageCurrent' | 'hole';

export function leakageCalculator(
  pressureP1: number,
  pressureP2: number,
  temperature: number,
  kappa: number,
  gas: number,
  hole: number,
  leakageCurrent: number,
  toCalc: SelectedLeakageValue
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
    case 'leakageCurrent': {
      const vv =
        (((Math.PI * Math.pow(hole / 1000, 2)) / 4) *
          psi *
          Math.pow(2 * pressureP1 * 100000 * density, 0.5)) /
        density;
      const maximal = vv * 60 * 1000;
      return [round(maximal), round(maximal * 0.59)];
    }
    case 'hole': {
      const calcLeakage = leakageCurrent / 60000;
      const area = (calcLeakage * density) / psi / Math.pow(2 * pressureP1 * 100000 * density, 0.5);
      const minimal = Math.pow(4 * (area / Math.PI), 0.5) * 1000;
      return [round(minimal / Math.pow(0.59, 0.5)), round(minimal)];
    }
  }
}

export type SelectedContainerValue = 'volume' | 'engineTolerance';

export function containerCalculator(
  deliveredAmount: number,
  necessaryAmount: number,
  engineTolerance: number,
  offPressure: number,
  onPressure: number,
  volume: number,
  toCalc: SelectedContainerValue
) {
  const mVolume = volume / 1000;
  switch (toCalc) {
    case 'volume':
      return (
        1000 *
        round(
          (deliveredAmount *
            60 *
            (necessaryAmount / deliveredAmount - Math.pow(necessaryAmount / deliveredAmount, 2))) /
            (engineTolerance * (offPressure - onPressure))
        )
      );
    case 'engineTolerance':
      return round(
        (deliveredAmount *
          60 *
          (necessaryAmount / deliveredAmount - Math.pow(necessaryAmount / deliveredAmount, 2))) /
          (mVolume * (offPressure - onPressure))
      );
  }
}

export function containerLeakageCalculator(
  volume: number,
  onPressure: number,
  offPressure: number,
  measureTime: number
) {
  volume = volume / 1000;
  measureTime = measureTime / 60;
  return round((volume * (onPressure - offPressure)) / measureTime);
}

export function pressureWorkCalculator(pressureP1: number, temperature: number) {
  const pressureP2 = 1;
  const T2 = 293;
  const KAPPA = 1.4;
  const t0 = 273 + temperature;
  const kappa2 = 1 / (KAPPA / (KAPPA - 1));
  const t1 = T2 * Math.pow(pressureP1 / pressureP2, kappa2);
  /**
   * Math.round((result - 1) * Math.pow(10, 3)) / 10;
   * Calculation for app and other website
   */
  const result = round(1 / ((1 - t0 / t1) / (1 - T2 / t1)), 3);
  return Math.round((result - 1) * Math.pow(10, 3)) / 10;
}

export function waterAmountCalculator(
  airTemp: number,
  humidity: number,
  airDelivery: number,
  pressure = 1
): number {
  const { table } = pressureTable;
  const entry = table.find((entry) => entry.temp === Math.round(airTemp));
  let saturation = 0;
  if (!entry) {
    if (airTemp <= table[0].temp) saturation = table[0].saturation;
    else if (airTemp >= table[table.length - 1].temp) saturation = table[table.length - 1].saturation;
  } else saturation = entry.saturation;
  return round((saturation * (humidity / 100) * airDelivery * 60) / (pressure * 1000));
}

export type CondensateResult = {
  waterAmount: number;
  condensateLoss: number;
  remainingHumidity: number;
  coldLoss: number;
  coldHumidity: number;
  totalLoss: number;
};

export function condensateCalculator(
  airTemp: number,
  humidity: number,
  airDelivery: number,
  pressure: number,
  coolTemp: number,
  dtp: number,
  hours: number
): CondensateResult {
  const waterAmount = waterAmountCalculator(airTemp, humidity, airDelivery);
  const remainingHumidity = waterAmountCalculator(coolTemp, 100, airDelivery, pressure);
  const condensateLoss = round(waterAmount - remainingHumidity);
  const coldHumidity = waterAmountCalculator(dtp, 100, airDelivery, pressure);
  const coldLoss = round(remainingHumidity - coldHumidity);

  const result = {
    waterAmount: waterAmount * hours,
    condensateLoss: condensateLoss * hours,
    coldHumidity: coldHumidity * hours,
    remainingHumidity: remainingHumidity * hours,
    coldLoss: coldLoss * hours,
  };
  const totalLoss = waterAmount !== 0 && coldLoss !== 0 ? round(waterAmount - coldLoss) : 0;

  return { ...result, totalLoss };
}
