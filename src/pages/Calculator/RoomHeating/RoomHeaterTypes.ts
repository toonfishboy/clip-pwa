export type EnergyType = 'heatOil' | 'earthGas';

export type RoomHeaterValues = {
  motorOutputPower: number | undefined; //Motorabgabeleistung bei Betriebsdruck - kw
  motorEfficiency: number | undefined; //Motorwirkungsgrad - %
  usageHours: number | undefined; //Laststunden pro Tag - h
  usageMonths: number | undefined; //Heizperiode im Jahr - M(30T)
  heatTransferEfficiency: number | undefined; //Wirkungsgrad Wärmetauscher - %
};

export type RoomHeaterResult = {
  motorPowerUsage: number; //Motoraufnahmeleistung - kw
  availableOilPower: number; //Nutzbare Energie pro Laststunde Öl - kwh
  availableAirPower: number; //Nutzbare Energie pro Laststunde Luft - kwh
  heatPowerEfficiencyWithHeatTransfer: number; //Wärmeleistung eff. mit Wärmetauscher - kw
  generatedHeatPowerWRG: number; //Erzeugte Wärmeleistung WRG - kwh/Jahr
  generatedHeatPowerAir: number; //Erzeugte Wärmeleistung Lüftungstechnik - kwh/Jahr
};

export type EnergyPriceValues = {
  price: number | undefined; //Preis [€]
  consumptionYear: number | undefined; //Verbrauch pro Jahr [unit]
  outputPower: number | undefined; //Brennwert [kwh/unit]
  co2Emissions: number | undefined; //CO2 Emissionen [kg-C02/unit]
  heaterEfficiency: number | undefined; //Wirkungsgrad der Heizung [%]
};

export type EnergySavings = {
  price: number; // €/Jahr
  co2: number; // kg-CO2/Jahr
};

export type EnergyPriceResult = {
  completePrice: number; //Kosten [€]
  generatedEnergy: number; //Erzeugte Energie [kwh/Jahr]
  heatPowerEfficiency: number; //Wärmeleistung eff. Ölheizung [kwh/Jahr]
  savingsWRGHeat: EnergySavings; //Einsparung WRG mit Wärmetauscher
  savingsAir: EnergySavings; //Einsparung mit Lüftungsanlage
};
