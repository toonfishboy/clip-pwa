import Home from './Home';
import ContainerCalculator from './Calculator/ContainerCalculator';
import PipeCableCalculator from './Calculator/PipeCableCalculator';
import LeakageCalculator from './Calculator/LeakageCalculator';
import ContainerLeakageCalculator from './Calculator/ContainerLeakageCalculator';
import Settings from './Misc/Settings';
import AirCurrentCalculator from './Calculator/AirCurrentCalculator';
import PressureWorkCalculator from './Calculator/PressureWorkCalculator';
import CondensateCalculator from './Calculator/CondensateCalculator';
import UnitCalculator from './Calculator/UnitCalculator/UnitCalculator';
import RoomHeaterCalculator from './Calculator/RoomHeating/RoomHeaterCalculator';
import { createHashRouter } from 'react-router-dom';
import Tools from './Misc/Tools';
import CalcWrapper from '../controls/CalcWrapper';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/container',
    element: (
      <CalcWrapper title={'Behälter Leckage'}>
        <ContainerCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/pipeCable',
    element: (
      <CalcWrapper title={'Rohrleitung'}>
        <PipeCableCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/airCurrent',
    element: (
      <CalcWrapper title={'Lüftungstechnik'}>
        <AirCurrentCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/leakage',
    element: (
      <CalcWrapper title={'Leckage'}>
        <LeakageCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/containerLeakage',
    element: (
      <CalcWrapper title={'Behälter Leckage'}>
        <ContainerLeakageCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/pressureWork',
    element: (
      <CalcWrapper title={'Verdichtungsarbeit'}>
        <PressureWorkCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/condensate',
    element: (
      <CalcWrapper title={'Kondensat'}>
        <CondensateCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/units',
    element: (
      <CalcWrapper title={'Einheiten Rechner'}>
        <UnitCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/roomHeater',
    element: (
      <CalcWrapper title={'Raumheizung durch Abluftwärme'}>
        <RoomHeaterCalculator />
      </CalcWrapper>
    ),
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/tools',
    element: <Tools />,
  },
]);

export default router;
