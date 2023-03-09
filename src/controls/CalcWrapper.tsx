import { FC, PropsWithChildren } from 'react';
import Container from './Layout/Container';
import Header from './Layout/Header';

interface CalcWrapperProps extends PropsWithChildren {
  title: string;
}

const CalcWrapper: FC<CalcWrapperProps> = ({ children, title }) => {
  return (
    <Container>
      <Header title={title} />
      <Container className={'m-2 gap-2'}>{children}</Container>
    </Container>
  );
};

export default CalcWrapper;
