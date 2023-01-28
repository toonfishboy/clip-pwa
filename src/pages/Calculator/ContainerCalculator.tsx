import { FC, useMemo, useState } from 'react';
import NumberInput from '../../controls/Inputs/NumberInput';
import { containerCalculator, SelectedContainerValue } from '../../utils/clipCalc';
import { GetDocValue, useUpdateValue } from '../../hooks/useUpdateValue';
import LabelWrapper from '../../controls/LabelWrapper';
import RadioGroup from '../../controls/RadioGroup/RadioGroup';
import { checkNaN, hasRequiredValues } from '../../utils/helper';
import Header from '../../controls/Layout/Header';
import LabelRadioInput from '../../controls/LabelRadioInput';
import Container from '../../controls/Layout/Container';
import Footer from '../../controls/Layout/Footer';

type ContainerValues = {
  deliveredAmount: number | undefined;
  necessaryAmount: number | undefined;
  engineTolerance: number | undefined;
  offPressure: number | undefined;
  onPressure: number | undefined;
  volume: number | undefined;
};

const defaultContainerValues: ContainerValues = {
  deliveredAmount: undefined,
  necessaryAmount: undefined,
  engineTolerance: undefined,
  offPressure: undefined,
  onPressure: undefined,
  volume: undefined,
};

const getEmail = (getValues: GetDocValue<ContainerValues>) => `
	Liefermenge des Kompressors [m³/min]: ${getValues('deliveredAmount')}%0D%0A
	Benötigte Liefermenge [m³/min]:  ${getValues('necessaryAmount')}%0D%0A
	Zulässige Motorschaltspiele/h [1/h]:  ${getValues('engineTolerance')}%0D%0A
	Ausschaltdruck des Kompressors [barÜ]:  ${getValues('offPressure')}%0D%0A
	Einschaltdruck des Kompressors [barÜ]:  ${getValues('onPressure')}%0D%0A
	Volumen des Druckluftbehälters [m³]:  ${getValues('volume')}
`;

const ContainerCalculator: FC = () => {
  const [containerValues, setContainerValues] = useState<ContainerValues>(defaultContainerValues);
  const [selected, setSelected] = useState<SelectedContainerValue>('volume');
  const [getContainerValues, updateContainerValues] = useUpdateValue(containerValues, setContainerValues);
  const resetValues = () => setContainerValues(defaultContainerValues);

  const result = useMemo(() => {
    const {
      deliveredAmount = 0,
      necessaryAmount = 0,
      engineTolerance = 0,
      offPressure = 0,
      onPressure = 0,
      volume = 0,
    } = containerValues;
    if (!hasRequiredValues(containerValues, selected)) return;
    return containerCalculator(
      deliveredAmount,
      necessaryAmount,
      engineTolerance,
      offPressure,
      onPressure,
      volume,
      selected
    );
  }, [containerValues, selected]);

  const getCalcValue = <Key extends keyof ContainerValues>(key: Key) => {
    if (key === selected) return checkNaN(result);
    return getContainerValues(key);
  };

  return (
    <Container>
      <Header title={'Behälter Leckage'} />
      <Container className={'m-2 gap-2'}>
        <LabelWrapper label={'Liefermenge des Kompressors [m³/min]:'}>
          <NumberInput
            number={getContainerValues('deliveredAmount')}
            onNumberChange={updateContainerValues('deliveredAmount')}
          />
        </LabelWrapper>
        <LabelWrapper label={'Benötigte Liefermenge [m³/min]:'}>
          <NumberInput
            number={getContainerValues('necessaryAmount')}
            onNumberChange={updateContainerValues('necessaryAmount')}
          />
        </LabelWrapper>
        <LabelWrapper label={'Ausschaltdruck des Kompressors [barÜ]:'}>
          <NumberInput
            number={getContainerValues('offPressure')}
            onNumberChange={updateContainerValues('offPressure')}
          />
        </LabelWrapper>
        <LabelWrapper label={'Einschaltdruck des Kompressors [barÜ]:'}>
          <NumberInput
            number={getContainerValues('onPressure')}
            onNumberChange={updateContainerValues('onPressure')}
          />
        </LabelWrapper>
        <RadioGroup
          selected={selected}
          onSelectChange={(selected) => setSelected(selected as SelectedContainerValue)}
        >
          <LabelRadioInput
            number={getCalcValue('engineTolerance')}
            selected={selected}
            radioValue={'engineTolerance'}
            label={'Zulässige Motorschaltspiele/h [1/h]:'}
            onNumberChange={updateContainerValues('engineTolerance')}
          />
          <LabelRadioInput
            number={getCalcValue('volume')}
            selected={selected}
            radioValue={'volume'}
            label={'Volumen des Druckluftbehälters [l]:'}
            onNumberChange={updateContainerValues('volume')}
          />
        </RadioGroup>
        <Footer
          resetValues={resetValues}
          subject="Behälter Leckage"
          getEmail={() => getEmail(getCalcValue)}
        />
      </Container>
    </Container>
  );
};

export default ContainerCalculator;
