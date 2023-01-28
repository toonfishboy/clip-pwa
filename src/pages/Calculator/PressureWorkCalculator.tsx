import { FC, useMemo, useState } from 'react';
import NumberInput from '../../controls/Inputs/NumberInput';
import LabelWrapper from '../../controls/LabelWrapper';
import Container from '../../controls/Layout/Container';
import Footer from '../../controls/Layout/Footer';
import Header from '../../controls/Layout/Header';
import { useUpdateValue } from '../../hooks/useUpdateValue';
import { pressureWorkCalculator } from '../../utils/clipCalc';
import { hasRequiredValues } from '../../utils/helper';

type PressureWorkValues = {
  pressureP1: number | undefined;
  temperature: number | undefined;
};

const defaultPressureWorkValus: PressureWorkValues = {
  pressureP1: undefined,
  temperature: 20,
};

const getEmail = (pressureWorkValues: PressureWorkValues, result: number | undefined) => `
	Netzdruck [bar]: ${pressureWorkValues.pressureP1}%0D%0A
	Umgebungstemperatur [C]: ${pressureWorkValues.temperature}%0D%0A
	Leistungsaufnahme [%]:  ${result}
`;

const PressureWorkCalculator: FC = () => {
  const [pressureWorkValues, setPressureWorkValues] = useState<PressureWorkValues>(defaultPressureWorkValus);
  const [getPressureWorkValues, updatePressureWorkValues] = useUpdateValue(
    pressureWorkValues,
    setPressureWorkValues
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
      <Container className={'m-2 gap-2'}>
        <LabelWrapper label="Netzdruck [bar]:">
          <NumberInput
            number={getPressureWorkValues('pressureP1')}
            onNumberChange={updatePressureWorkValues('pressureP1')}
          />
        </LabelWrapper>
        <LabelWrapper label="Umgebungstemperatur [°C]:">
          <NumberInput
            min={0}
            max={50}
            number={getPressureWorkValues('temperature')}
            onNumberChange={updatePressureWorkValues('temperature')}
          />
        </LabelWrapper>
        <LabelWrapper label="Leistungsaufnahme [%]:">
          <NumberInput number={result} disabled={true} />
        </LabelWrapper>
        <Footer
          resetValues={resetValues}
          subject="Verdichtungsarbeit"
          getEmail={() => getEmail(pressureWorkValues, result)}
        />
      </Container>
    </Container>
  );
};

export default PressureWorkCalculator;
