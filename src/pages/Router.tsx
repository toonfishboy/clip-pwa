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

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/container',
    element: <ContainerCalculator />,
  },
  {
    path: '/pipeCable',
    element: <PipeCableCalculator />,
  },
  {
    path: '/airCurrent',
    element: <AirCurrentCalculator />,
  },
  {
    path: '/leakage',
    element: <LeakageCalculator />,
  },
  {
    path: '/containerLeakage',
    element: <ContainerLeakageCalculator />,
  },
  {
    path: '/pressureWork',
    element: <PressureWorkCalculator />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/condensate',
    element: <CondensateCalculator />,
  },
  {
    path: '/units',
    element: <UnitCalculator />,
  },
  {
    path: '/roomHeater',
    element: <RoomHeaterCalculator />,
  },
]);

export default router;
