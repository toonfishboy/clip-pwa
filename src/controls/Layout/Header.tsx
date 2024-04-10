import type { FC } from 'react';
import { MdArrowBack, MdSettings } from 'react-icons/md';
import { iconClassName } from '../../pages/Home';
import { useNavigate } from '@tanstack/react-router';

interface HeaderProps {
	title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
	const navigate = useNavigate();

	return (
		<header className={'flex w-full items-center justify-between bg-rose-600 text-white'}>
			<MdArrowBack className={iconClassName} onClick={() => navigate({ to: '/' })} />
			<span className={'p-2 text-2xl'}>{title}</span>
			<MdSettings className={iconClassName} onClick={() => navigate({ to: '/settings' })} />
		</header>
	);
};

export default Header;
