import type { FC } from 'react';
import Button from './Button';
import { useStore } from '@nanostores/react';
import { $email } from '../../utils/stores';

interface FooterProps {
	resetValues: () => void;
	getEmail: () => string;
	subject: string;
}

const Footer: FC<FooterProps> = ({ resetValues, getEmail, subject }) => {
	const email = useStore($email);
	return (
		<div className={'flex gap-2'}>
			<Button onClick={resetValues}>Zurücksetzen</Button>
			<a
				className="rounded-md bg-gradient-to-tr from-rose-500 to-rose-700 py-2 px-3 text-lg text-white shadow-md"
				href={`mailto:${email}?subject=${subject}&body=${getEmail()}`}
			>
				Ergebnis als Mail
			</a>
		</div>
	);
};

export default Footer;
