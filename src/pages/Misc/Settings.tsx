import { FC } from 'react';
import { useRecoilState } from 'recoil';
import Input from '../../controls/Inputs/Input';
import LabelWrapper from '../../controls/LabelWrapper';
import Container from '../../controls/Layout/Container';
import Header from '../../controls/Layout/Header';
import { emailState } from '../../recoil/atoms';

const Settings: FC = () => {
  const [email, setEmail] = useRecoilState(emailState);

  return (
    <Container>
      <Header title="Einstellungen" />
      <Container className="m-2 gap-2">
        <LabelWrapper label="E-mail:">
          <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </LabelWrapper>
      </Container>
    </Container>
  );
};

export default Settings;
