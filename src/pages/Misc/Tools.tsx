import { FC, useState } from 'react';
import ImageAccordion from '../../controls/ImageAccordion';
import RoomHeaterCalculator from '../Calculator/RoomHeating/RoomHeaterCalculator';
import AirCurrentCalculator from '../Calculator/AirCurrentCalculator';
import CondensateCalculator from '../Calculator/CondensateCalculator';
import ContainerCalculator from '../Calculator/ContainerCalculator';
import ContainerLeakageCalculator from '../Calculator/ContainerLeakageCalculator';
import LeakageCalculator from '../Calculator/LeakageCalculator';
import PipeCableCalculator from '../Calculator/PipeCableCalculator';
import PressureWorkCalculator from '../Calculator/PressureWorkCalculator';
import UnitCalculator from '../Calculator/UnitCalculator/UnitCalculator';

const calculators = [
  {
    url: 'https://le-cdn.website-editor.net/6c5c30bc2d0f4fe98444bffb28b94f2f/dms3rep/multi/opt/ASD_60_012-637d97bb-1920w.png',
    description: 'Berechnung von Kompressorleistung und abzuführender Wärme.',
    title: 'Kompressor Leistung',
    calc: 'roomHeating',
  },
  {
    url: 'https://le-cdn.website-editor.net/md/and1/dms3rep/multi/opt/114395-1920w.jpeg',
    description:
      'Berechnung von Rohrleitungssystemen nach Volumenstrom, Druckverluste, Querschnitte und Längen.',
    title: 'Druckluft-Rohrleitung',
    calc: 'pipeCable',
  },
  {
    url: 'https://le-cdn.website-editor.net/md/and1/dms3rep/multi/opt/112551-1920w.jpeg',
    description: 'Berechnung von Zu- und Abluftsystemen zur Kühlung, Belüftung und Lufttauschsystemen.',
    title: 'Lüftungstechnik',
    calc: 'airCurrent',
  },
  {
    url: 'https://le-cdn.website-editor.net/6c5c30bc2d0f4fe98444bffb28b94f2f/dms3rep/multi/opt/schema-86ddf435-1920w.jpg',
    description: 'Kondensat-Kalkulation für die Berechnung von Kondensatmengen und Aufbereitungssytemen.',
    title: 'Druckluft-Kondensat',
    calc: 'condensate',
  },
  {
    url: 'https://le-cdn.website-editor.net/6c5c30bc2d0f4fe98444bffb28b94f2f/dms3rep/multi/opt/produktbild1-336f5663-1920w.png',
    description: 'Behälterberechnung nach Volumen, Druck und Wechselbelastung.',
    title: 'Druckluft-Behälter',
    calc: 'container',
  },
  {
    url: 'https://le-cdn.website-editor.net/6c5c30bc2d0f4fe98444bffb28b94f2f/dms3rep/multi/opt/R51d4ac404a175e43b456aefd0a1aa912-1920w.png',
    description: 'Berechnung der spezifischen Leistung von Verdichtersystemen.',
    title: 'Verdichtungsarbeit',
    calc: 'pressureWork',
  },
  {
    url: 'https://cdn.website-editor.net/6c5c30bc2d0f4fe98444bffb28b94f2f/dms3rep/multi/OIP+%282%29.gif',
    description: '',
    title: 'Düse/Leckage',
    calc: 'leakage',
  },
  {
    url: 'https://le-cdn.website-editor.net/md/and1/dms3rep/multi/opt/113960-1920w.jpeg',
    description: 'Leckageermittlung mittels Behältervolumen und Drucksenkung.',
    title: 'Behälter Leckage Messung',
    calc: 'containerLeakage',
  },
  {
    url: 'https://le-cdn.website-editor.net/6c5c30bc2d0f4fe98444bffb28b94f2f/dms3rep/multi/opt/wp_file_20008-10b05ba4-1920w.png',
    description:
      'Bar oder PSI? Kubikmeter oder Liter? Unser Umrechnungstool kennt alle internationalen Standard-Einheiten für:\n' +
      'Druck\n' +
      'Volumen\n' +
      'Leistung\n' +
      'Temperatur\n' +
      'Volumenstrom',
    title: 'Einheiten Rechner',
    calc: 'unit',
  },
] as const;

type CalcType = (typeof calculators)[number]['calc'];

const Tools: FC = () => {
  const [openCalc, setOpenCalc] = useState<CalcType | undefined>();
  const getCalc = (calc: CalcType) => {
    switch (calc) {
      case 'airCurrent':
        return <AirCurrentCalculator hasFooter={false} />;
      case 'condensate':
        return <CondensateCalculator hasFooter={false} />;
      case 'container':
        return <ContainerCalculator hasFooter={false} />;
      case 'containerLeakage':
        return <ContainerLeakageCalculator hasFooter={false} />;
      case 'leakage':
        return <LeakageCalculator hasFooter={false} />;
      case 'pipeCable':
        return <PipeCableCalculator hasFooter={false} />;
      case 'pressureWork':
        return <PressureWorkCalculator hasFooter={false} />;
      case 'roomHeating':
        return <RoomHeaterCalculator hasFooter={false} />;
      case 'unit':
        return <UnitCalculator />;
    }
  };

  return (
    <div className={'my-2 flex flex-col gap-4'}>
      {calculators.map(({ title, url, description, calc }) => (
        <ImageAccordion
          isOpen={openCalc === calc}
          setIsOpen={() => setOpenCalc(openCalc === calc ? undefined : calc)}
          imgSrc={url}
          title={title}
          description={description}
          key={calc}
        >
          {getCalc(calc)}
        </ImageAccordion>
      ))}
    </div>
  );
};

export default Tools;
