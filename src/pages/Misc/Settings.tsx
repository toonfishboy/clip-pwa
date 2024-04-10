import { useStore } from '@nanostores/react';
import type { FC } from 'react';
import Input from '../../controls/Inputs/Input';
import LabelWrapper from '../../controls/LabelWrapper';
import Container from '../../controls/Layout/Container';
import Header from '../../controls/Layout/Header';
import { $email } from '../../utils/stores';

const Settings: FC = () => {
	const email = useStore($email);

	return (
		<Container>
			<Header title="Einstellungen" />
			<Container className="m-2 gap-2">
				<LabelWrapper label="E-mail:">
					<Input type="email" value={email} onChange={(event) => $email.set(event.target.value)} />
				</LabelWrapper>
			</Container>
		</Container>
	);
};

export default Settings;
